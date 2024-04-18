from django.test import TestCase, Client
from django.urls import reverse
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from field_trips.serializers import TripSerializer
import json
from ..models import Trip


class SignUpTest(TestCase):
  def setUp(self):
    self.client = APIClient()
  def test_signup(self):
    response = self.client.post('/signup', {
      'username': 'testuser',
      'password': 'testpassword',
      'email': 'test@test.com',
    })
    self.assertEqual(response.status_code, 201)
    user = User.objects.get(username='testuser')
    self.assertIsNotNone(user)
    token = Token.objects.get(user=user)
    self.assertIsNotNone(token)

class UserTest(TestCase):
  def setUp(self):
    self.client = APIClient()
    response = self.client.post('/signup', {
      'username': 'testuser',
      'password': 'testpassword',
      'email': 'test@test.com',
    })
    self.test_user = User.objects.get(username='testuser')
    self.token = response.data['token']
  
  def test_login(self):
    response = self.client.post('/login', {
      'username': 'testuser',
      'password': 'testpassword',
    })
    self.assertEqual(response.status_code, 200)
    user = User.objects.get(username='testuser')
    self.assertIsNotNone(user)
    token = Token.objects.get(user=user)
    self.assertIsNotNone(token)

  def test_test_token(self):
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
    response = self.client.get('/test_token')
    self.assertEqual(response.status_code, 200)

  def test_logout(self):
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
    response = self.client.post('/logout')
    self.assertEqual(response.status_code, 200)

class ProfileTest(TestCase):
  def setUp(self):
    self.client = APIClient()
    response = self.client.post('/signup', {
      'username': 'testuser',
      'password': 'testpassword',
      'email': 'test@test.com',
    })
    self.test_user = User.objects.get(username='testuser')
    self.token = response.data['token']

  def test_get_profile(self):
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
    response = self.client.get('/profile')
    self.assertEqual(response.status_code, 200)

  def test_update_profile(self):
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
    response = self.client.put('/profile', {
      'phone': '123-456-7890',
      'e_name': 'John Doe',
      'e_phone': '098-765-4321',
      'avatar': 'https://picsum.photos/200',
      'family': 'Doe Jr.',
      'skills': 'Basic ID'
    }, format='json')
    self.assertEqual(response.status_code, 200)
  
class MushroomTest(TestCase):
  def setUp(self):
    self.client = APIClient()
    response = self.client.post('/signup', {
            'username': 'testuser',
            'password': 'testpassword',
            'email': 'test@test.com',
        })
    self.test_user = User.objects.get(username='testuser')
    self.token = response.data['token']
  
  def test_get_mushrooms(self):
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
    response = self.client.get('/mushrooms')
    self.assertEqual(response.status_code, 200)
  def test_create_mushroom(self):
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
    response = self.client.post('/mushrooms', {
      'common_name': 'Dyer\'s Polypore',
      'latin_name': 'Phaeolus schweinitzii',
      'image_url': 'https://en.wikipedia.org/wiki/Phaeolus_schweinitzii#/media/'
    }, format='json')
    self.assertEqual(response.status_code, 201)

class TripTest(TestCase):
  def setUp(self):
    self.client = APIClient()
    response = self.client.post('/signup', {
            'username': 'testuser',
            'password': 'testpassword',
            'email': 'test@test.com',
        })
    self.test_user = User.objects.get(username='testuser')
    self.token = response.data['token']
  
  def test_get_trips(self):
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
    response = self.client.get('/trips')
    self.assertEqual(response.status_code, 200)
  def test_create_trip(self):
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
    response = self.client.post('/trips', {
      "date": "2024-04-25",
      "general_location": "Mt Hood National Forest",
      "specific_location": "45.227173, -121.839455",
      "time_start": "09:00",
      "time_end": "15:00",
      "capacity": 5,
      "restrictions": "No dogs",
      "note": "Strenuous terrain",
      "registration_close_date": "2024-04-20",
      "leader": self.test_user.id
    }, format='json')
    self.assertEqual(response.status_code, 201)

class TripDetailTest(TestCase):
  def setUp(self):
    self.client = APIClient()
    response = self.client.post('/signup', {
            'username': 'testuser',
            'password': 'testpassword',
            'email': 'test@test.com',
        })
    self.test_user = User.objects.get(username='testuser')
    self.token = response.data['token']
    # create trip
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
    response = self.client.post('/trips', {
      "date": "2024-04-25",
      "general_location": "Mt Hood National Forest",
      "specific_location": "45.227173, -121.839455",
      "time_start": "09:00",
      "time_end": "15:00",
      "capacity": 5,
      "restrictions": "No dogs",
      "note": "Strenuous terrain",
      "registration_close_date": "2024-04-20",
      "leader": self.test_user.id
    }, format='json')
    # get trip id#
    self.trip = Trip.objects.get(id=response.data['id'])
    
  def test_get_trip_by_id(self):
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
    response = self.client.get(reverse('trip_detail', kwargs={'pk': self.trip.pk}))
    self.assertEqual(response.status_code, status.HTTP_200_OK)
  def test_get_invalid_trip(self):
      self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
      response = self.client.get(reverse('trip_detail', kwargs={'pk': 30}))
      self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
  def test_update_trip(self):
      self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
      response = self.client.put(
          reverse('trip_detail', kwargs={'pk': self.trip.pk}),
          data={
              "date": "2025-04-26",
              "general_location": "Mt Hood National Forest",
              "specific_location": "45.227173, -121.839455",
              "time_start": "09:00",
              "time_end": "15:00",
              "capacity": 5,
              "restrictions": "No dogs",
              "note": "Strenuous terrain",
              "registration_close_date": "2024-04-20",
              "leader": self.test_user.id
          },
          format='json'
      )
      self.assertEqual(response.status_code, status.HTTP_200_OK)
  def test_invalid_update_trip(self):
      self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
      response = self.client.put(
          reverse('trip_detail', kwargs={'pk': self.trip.pk}),
          data={},
          format='json'
      )
      self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

  def test_valid_delete_trip(self):
      self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
      response = self.client.delete(reverse('trip_detail', kwargs={'pk': self.trip.pk}))
      self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

  def test_invalid_delete_trip(self):
      self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token)
      response = self.client.delete(reverse('trip_detail', kwargs={'pk': 30}))
      self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

