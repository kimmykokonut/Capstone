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