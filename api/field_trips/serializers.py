from rest_framework import serializers
from .models import Profile
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator

# class MemberSerializer(serializers.ModelSerializer):
#   class Meta(object):
#     model = User
#     fields = ['username']

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