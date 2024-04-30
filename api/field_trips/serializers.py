from rest_framework import serializers
from .models import Profile, Mushroom, Trip, Registration, Permit
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

class UserNameSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['first_name']

class ProfileSerializer(serializers.ModelSerializer):
  user = UserSerializer()

  class Meta:
    model = Profile
    fields = ['user', 'phone', 'e_name', 'e_phone', 'avatar', 'family', 'skills', 'expiration_date']

class MushroomSerializer(serializers.ModelSerializer):
  class Meta:
    model = Mushroom
    fields = ['id', 'common_name', 'latin_name', 'image_url', 'info_url']  

class PermitSerializer(serializers.ModelSerializer):
  class Meta:
    model = Permit
    fields = ['id', 'type', 'day_cost', 'annual_cost', 'name']

class TripSerializer(serializers.ModelSerializer):
  permits = serializers.PrimaryKeyRelatedField(many=True, queryset=Permit.objects.all(), required=False)
  class Meta:
    model = Trip
    fields = ['id', 'date', 'general_location', 'specific_location', 'time_start', 'time_end', 'capacity', 'waitlist', 'restrictions', 'image_url', 'note', 'status', 'registration_close_date', 'leader', 'permits']

class TripEditSerializer(serializers.ModelSerializer):
  permits = serializers.PrimaryKeyRelatedField(many=True, queryset=Permit.objects.all())

  class Meta:
        model = Trip
        fields = ['id', 'date', 'general_location', 'specific_location', 'time_start', 'time_end', 'capacity', 'waitlist', 'restrictions', 'image_url', 'note', 'status', 'registration_close_date', 'leader', 'permits']

  def update(self, instance, validated_data):
    print('validated data', validated_data)
    permits_data = validated_data.pop('permits', [])
    print('permit data', permits_data)
    instance = super().update(instance, validated_data)

    instance.permits.clear()
    for permit in permits_data:
      instance.permits.add(permit.id)
    
    instance.save()
    return instance

class RegistrationSerializer(serializers.ModelSerializer):
  class Meta:
    model = Registration
    fields = ['user', 'trip', 'status']