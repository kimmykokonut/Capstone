from django.contrib.auth.models import User
from django.db import models
import datetime
from datetime import timedelta
from django.utils import timezone

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

class Mushroom(models.Model):
  common_name = models.CharField(max_length=200, blank=True)
  latin_name = models.CharField(max_length=200)
  image_url = models.URLField(blank=True)
  info_url = models.URLField(blank=True)

  def __str__(self):
    return self.latin_name

class Trip(models.Model):
  date = models.DateField()
  general_location = models.CharField(max_length=100)
  specific_location = models.CharField(max_length=200, blank=True)
  time_start = models.TimeField(default=datetime.time(9,0))
  time_end = models.TimeField(default=datetime.time(15,0))
  capacity = models.IntegerField(default=12)
  restrictions = models.TextField(blank=True)
  image_url = models.URLField(default='https://cdn.pixabay.com/photo/2023/10/21/11/23/ai-generated-8331261_1280.png')
  note = models.TextField(blank=True)
  status = models.CharField(100)
  mushrooms = models.ManyToManyField(Mushroom)

  def __str__(self):
    return self.date
  
class Registration(models.Model):
  STATUS_CHOICES = [
    ('registered', 'Registered'),
    ('chosen', 'Chosen'),
    ('waitlisted', 'Waitlisted'),
    ('rejected', 'Rejected'),
  ]
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
  status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='registered')