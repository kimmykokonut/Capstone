from django.test import TestCase, Client
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class SignUpTest(TestCase):
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
  @classmethod
  def setUpTestData(cls):
    cls.client = Client()
    response = cls.client.post('/signup', {
      'username': 'testuser',
      'password': 'testpassword',
      'email': 'test@test.com',
    })
    cls.test_user = User.objects.get(username='testuser')
  
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