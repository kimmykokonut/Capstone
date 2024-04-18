from django.test import TestCase
from ..models import Trip, User, Registration, Profile

class TripModelTest(TestCase):
  def setUp(self):
    self.user1 = User.objects.create(username='user1', password='password')
    self.user2 = User.objects.create(username='user2', password='password')
    self.user3 = User.objects.create(username='user3', password='password')
    self.trip = Trip.objects.create(
      date='2024-01-08', 
      general_location='Test Location',
      registration_close_date='2024-01-01'
      )

    self.reg1 = Registration.objects.create(user=self.user1, trip=self.trip)
    self.reg2 = Registration.objects.create(user=self.user2, trip=self.trip)
    self.reg3 = Registration.objects.create(user=self.user3, trip=self.trip)
  
  def test_run_lottery(self):
    self.trip.run_lottery()

    self.reg1.refresh_from_db()
    self.reg2.refresh_from_db()
    self.reg3.refresh_from_db()

    statuses = [reg.status for reg in [self.reg1, self.reg2, self.reg3]]
    self.assertEqual(statuses.count('accepted'), 2)
    self.assertEqual(statuses.count('waitlisted'), 1)
    self.assertEqual(statuses.count('rejected'), 0)
