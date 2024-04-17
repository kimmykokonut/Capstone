from django.test import TestCase, Client
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient

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

