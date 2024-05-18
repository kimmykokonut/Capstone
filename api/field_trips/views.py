from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import JsonResponse, HttpResponse
from .models import Profile, Registration, Trip, Mushroom, Permit
from .serializers import UserSerializer, ProfileSerializer, MushroomSerializer, TripSerializer, RegistrationSerializer, UserNameSerializer, PermitSerializer, TripEditSerializer
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User, Group
from django.shortcuts import get_object_or_404
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.conf import settings
from rest_framework.exceptions import PermissionDenied
from .permissions import IsLeaderOrCoordinator

def welcome(request):
  return HttpResponse("Welcome to the OMS Field Trip API")

class CookieTokenAuthentication(TokenAuthentication):
  def authenticate(self, request):
    token = request.COOKIES.get('auth_token')
    if not token:
      return None
    try:
      token = Token.objects.get(key=token)
    except Token.DoesNotExist:
      return None
    return (token.user, token)
  
# User can login, signup, logout
@api_view(['POST'])
def login(request):
  user = get_object_or_404(User, username=request.data['username'])
  if not user.check_password(request.data['password']):
    return Response({"detail": "Not Found."}, status=status.HTTP_404_NOT_FOUND)
  token, created = Token.objects.get_or_create(user=user)
  serializer = UserSerializer(instance=user)
  response = Response({"user": serializer.data})
  # once using Https change samesite='None'
  # http-local dev: samesite='', secure=False
  response.set_cookie('auth_token', token.key, httponly=True, samesite='None', secure=True)
  return response

@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
  username = request.data.get('username')
  if username in settings.ACCOUNT_USERNAME_BLACKLIST:
    return Response({"detail": "This username is not allowed."}, status.HTTP_400_BAD_REQUEST)
  serializer = UserSerializer(data=request.data)
  if serializer.is_valid():
    user = serializer.save()
    #hash pw. so og not stored
    user.set_password(request.data['password'])
    user.first_name=serializer.validated_data['first_name']
    user.last_name=serializer.validated_data['last_name']
    user.save()
    # user = serializer.save()
    
    #add user to member group
    group, created = Group.objects.get_or_create(name='Member')
    user.groups.add(group)
    user.save()
    #add profile to user
    Profile.objects.create(user=user)
    token = Token.objects.create(user=user)
    response = Response({"user": serializer.data}, status=status.HTTP_201_CREATED)
    response.set_cookie('auth_token', token.key, httponly=True, samesite='None', secure=True)
    return response
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
  return Response("passed for {}".format(request.user.email))

@api_view(['GET'])
@authentication_classes([CookieTokenAuthentication])
def check_authentication(request):
  return Response({"isAuthenticated": request.user.is_authenticated})

@api_view(['POST'])
@authentication_classes([CookieTokenAuthentication])
def logout(request):
  if request.user.is_authenticated:
  #deletes token
    request.user.auth_token.delete()
    response = Response("logged out: {}".format(request.user.email), status=status.HTTP_200_OK)    
    response.delete_cookie('auth_token')
    return response
  else:
    return Response("No active session", status=400)

# User can add details to their profile
@api_view(['GET', 'PUT'])
@authentication_classes([CookieTokenAuthentication])
@permission_classes([IsAuthenticated])
def profile(request):
  profile = Profile.objects.get(user=request.user)
  if request.method == 'GET':
    serializer = ProfileSerializer(profile)
    return Response(serializer.data)
  elif request.method == 'PUT':
    serializer = ProfileSerializer(profile, data=request.data, partial=True)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
@api_view(['GET'])
@authentication_classes([CookieTokenAuthentication])
@permission_classes([IsAuthenticated])
def user_details(request, pk):
  try:
    user = get_object_or_404(User, pk=pk)
    serializer = UserNameSerializer(user)
    return Response(serializer.data)
  except Exception as e:
    return Response({'Error': 'something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET', 'POST'])
@authentication_classes([CookieTokenAuthentication])
def mushroom_list(request, format=None):
  if request.method == 'GET':
    mushrooms = Mushroom.objects.all()
    paginator = PageNumberPagination()
    paginator.page_size = 20
    paginated_mushrooms = paginator.paginate_queryset(mushrooms, request)
    serializer = MushroomSerializer(paginated_mushrooms, many=True)
    return paginator.get_paginated_response(serializer.data)
  if request.method == 'POST':
    serializer = MushroomSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  # not confirmed since cookie change

@api_view(['GET', 'POST'])
@authentication_classes([CookieTokenAuthentication])
def trip_list(request, format=None):
  if request.method == 'GET':
    trips = Trip.objects.all().order_by('-date')
    paginator = PageNumberPagination()
    paginator.page_size = 10
    paginated_trips = paginator.paginate_queryset(trips, request)
    serializer = TripSerializer(paginated_trips, many=True)
    return paginator.get_paginated_response(serializer.data)
  
  if request.method == 'POST':
    # only Leader/Coordinator group has permission
    if not (IsAuthenticated().has_permission(request, None) and IsLeaderOrCoordinator().has_permission(request, None)):
      return Response(status=status.HTTP_403_FORBIDDEN)
    
    serializer = TripSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])  
@authentication_classes([CookieTokenAuthentication])
def trip_detail(request, pk):
  try: 
    trip = Trip.objects.get(pk=pk)
  except Trip.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)

  if request.method == 'GET':
    serializer = TripSerializer(trip)
    return Response(serializer.data)
  
  elif request.method in ['PUT', 'PATCH']:
    # only Leader/Coordinator group has permission
    if not (IsAuthenticated().has_permission(request, None) and IsLeaderOrCoordinator().has_permission(request, None)):
      return Response(status=status.HTTP_403_FORBIDDEN)

    serializer = TripEditSerializer(trip, data=request.data, partial=(request.method == 'PATCH'))
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  elif request.method == 'DELETE':
    # only Leader/Coordinator group has permission
    if not (IsAuthenticated().has_permission(request, None) and IsLeaderOrCoordinator().has_permission(request, None)):
      return Response(status=status.HTTP_403_FORBIDDEN)
    
    trip.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
    

@api_view(['GET', 'POST'])
@authentication_classes([CookieTokenAuthentication])
@permission_classes([IsAuthenticated])
def trip_registration(request, trip_id):
  if request.method == 'GET':
    is_registered = Registration.objects.filter(user=request.user, trip_id=trip_id).exists()
    return Response({'isRegistered': is_registered})
  
  elif request.method == 'POST':
    trip = get_object_or_404(Trip, pk=trip_id)
    is_registered = Registration.objects.filter(user=request.user, trip_id=trip_id).exists()
    if is_registered:
      return Response({'error': 'You are already registered'}, status=status.HTTP_400_BAD_REQUEST)
    data = request.data.copy()
    data.update({
      'user': request.user.id,
      'trip': trip.id
    })
    serializer = RegistrationSerializer(data=data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
@authentication_classes([CookieTokenAuthentication])
@permission_classes([IsAuthenticated])
def lottery_results(request, trip_id):
  def get_user_info(registration):
    user = registration.user
    profile = user.profile
    return {
      'name': user.first_name + ' ' + user.last_name,
      'email': user.email,
      'phone': profile.phone,
      'e_name': profile.e_name,
      'e_phone': profile.e_phone,
      'notes': profile.notes,
      'family': profile.family,
      'skills': profile.skills
    }
  if request.method == 'GET':
    trip = get_object_or_404(Trip, pk=trip_id)
    accepted, waitlisted, rejected = trip.get_registrations_by_status()
    registered = Registration.objects.filter(trip_id=trip_id)

    data = {
      'accepted': [get_user_info(r) for r in accepted],
      'waitlisted': [r.user.email for r in waitlisted],
      'rejected': [r.user.email for r in rejected],
      'registered': [r.user.id for r in rejected],
    }
    return Response(data)
  
  elif request.method == 'POST':
    # only Leader/Coordinator group has permission
    if not (IsAuthenticated().has_permission(request, None) and IsLeaderOrCoordinator().has_permission(request, None)):
      return Response(status=status.HTTP_403_FORBIDDEN)
    
    trip = get_object_or_404(Trip, pk=trip_id)
    trip.run_lottery()
    return Response({'message': 'Lottery run success'})

@api_view(['GET'])
@authentication_classes([CookieTokenAuthentication])
@permission_classes([IsAuthenticated])
def user_registrations(request):
  registrations = Registration.objects.filter(user=request.user)
  data = [
    {
      'trip_id': r.trip.id,
      'status': r.status,
    }
    for r in registrations
  ]
  return Response(data)

@api_view(['GET'])
@authentication_classes([CookieTokenAuthentication])
@permission_classes([IsAuthenticated])
def permit_list(request):
  ids = request.GET.get('ids')
  if ids:
    ids = [int(id) for id in ids.split(',')]
    permits = Permit.objects.filter(id__in=ids).order_by('name')
  else:  
    permits = Permit.objects.all().order_by('name')
  serializer = PermitSerializer(permits, many=True)
  return Response(serializer.data)

# returns list of users that are part of Leader Group
@api_view(['GET'])
@authentication_classes([CookieTokenAuthentication])
@permission_classes([IsAuthenticated])
def leader_list(request):
  leader_group = Group.objects.get(name='Leader')
  leaders = leader_group.user_set.all().order_by('first_name')
  serializer = UserSerializer(leaders, many=True)
  return Response(serializer.data)