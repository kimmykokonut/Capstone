from django.contrib.auth.models import User
from django.db import models
from django.db.models import Prefetch
import datetime
from datetime import timedelta
from django.utils import timezone
import random
from .email_utils import send_applicant_email, send_leader_email

class Profile(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  phone = models.CharField(max_length=20)
  e_name = models.CharField(max_length=100)
  e_phone = models.CharField(max_length=20)
  avatar = models.URLField(default='https://cdn.pixabay.com/photo/2024/01/24/09/01/ai-generated-8529072_1280.png')
  expiration_date = models.DateField(default=timezone.now() + timedelta(days=365))
  notes = models.TextField(null=True)
  family = models.CharField(max_length=255, null=True)
  skills = models.CharField(max_length=500, null=True)

  def __str__(self):
    return self.user.first_name

class Mushroom(models.Model):
  common_name = models.CharField(max_length=200, blank=True)
  latin_name = models.CharField(max_length=200)
  image_url = models.URLField(blank=True)
  info_url = models.URLField(blank=True)
  class Meta:
    ordering = ['latin_name']
  def __str__(self):
    return self.latin_name

class Trip(models.Model):
  date = models.DateField()
  general_location = models.CharField(max_length=100)
  specific_location = models.CharField(max_length=200, blank=True)
  time_start = models.TimeField(default=datetime.time(9,0))
  time_end = models.TimeField(default=datetime.time(15,0))
  capacity = models.IntegerField(default=12)
  waitlist = models.IntegerField(default=6)
  restrictions = models.TextField(blank=True)
  image_url = models.URLField(default='https://cdn.pixabay.com/photo/2023/10/21/11/23/ai-generated-8331261_1280.png')
  note = models.TextField(blank=True)
  status = models.CharField(100, default="Registration Open")
  registration_close_date = models.DateField()
  mushrooms = models.ManyToManyField(Mushroom, blank=True)
  leader = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

  def __str__(self):
    return str(self.date)
  
  def run_lottery(self):
    print('running lottery...')
    registrations = list(self.registration_set.all())
    random.shuffle(registrations)
    for i, registration in enumerate(registrations):
      if i < self.capacity: 
        registration.status = 'accepted'
      elif i < self.capacity + self.waitlist:
        registration.status = 'waitlisted'
      else:
        registration.status = 'rejected'
      registration.save()

    send_leader_email(self)

    for registration in Registration.objects.filter(trip=self):
      send_applicant_email(registration)
    print('finished lottery...')

  def get_registrations_by_status(self):
    registrations = self.registration_set.order_by('status').select_related('user')
    accepted = [r for r in registrations if r.status == 'accepted']
    waitlisted = [r for r in registrations if r.status == 'waitlisted']
    rejected = [r for r in registrations if r.status == 'rejected']
    return accepted, waitlisted, rejected
  
class Registration(models.Model):
  STATUS_CHOICES = [
    ('registered', 'Registered'),
    ('accepted', 'Accepted'),
    ('waitlisted', 'Waitlisted'),
    ('rejected', 'Rejected'),
  ]
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
  status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='registered')

  def __str__(self):
    return str(self.user)