from rest_framework import serializers
from .models import Profile, Mushroom, Trip
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
  password = serializers.CharField(min_length=8, write_only=True)
  email = serializers.EmailField(
    validators=[UniqueValidator(queryset=User.objects.all())],
    required=True,
   )
  username = serializers.CharField(
    validators=[UniqueValidator(queryset=User.objects.all())]
    )
  
  class Meta(object):
    model = User
    fields = ['id', 'username', 'first_name', 'last_name', 'email', 'password']

class ProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = Profile
    fields = ['phone', 'e_name', 'e_phone', 'avatar', 'family', 'skills', 'expiration_date']

class MushroomSerializer(serializers.ModelSerializer):
  class Meta:
    model = Mushroom
    fields = ['common_name', 'latin_name', 'image_url', 'info_url']  