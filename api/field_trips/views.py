from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import JsonResponse, HttpResponse
from .models import Profile, Registration, Trip, Mushroom
from .serializers import UserSerializer, ProfileSerializer, MushroomSerializer, TripSerializer, RegistrationSerializer, UserNameSerializer
from rest_framework import status, generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User, Group
from django.shortcuts import get_object_or_404
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import AuthenticationFailed

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
  response.set_cookie('auth_token', token.key, httponly=True, samesite='None', secure=False)
  return response

@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
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
    response.set_cookie('auth_token', token.key, httponly=True, samesite='None', secure=False)
    return response
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
  return Response("passed for {}".format(request.user.email))

@api_view(['GET'])
@authentication_classes([CookieTokenAuthentication])
#@permission_classes([AllowAny])
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

  # UPDATE BELOW WITH COOKIE TOKEN AND TEST

@api_view(['GET', 'POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
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
  
@api_view(['GET', 'POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
def trip_list(request, format=None):
  if request.method == 'GET':
    trips = Trip.objects.all().order_by('-date')
    paginator = PageNumberPagination()
    paginator.page_size = 10
    paginated_trips = paginator.paginate_queryset(trips, request)
    serializer = TripSerializer(paginated_trips, many=True)
    return paginator.get_paginated_response(serializer.data)
  if request.method == 'POST':
    serializer = TripSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
@api_view(['GET', 'PUT', 'DELETE'])  
def trip_detail(request, pk):
  try: 
    trip = Trip.objects.get(pk=pk)
  except Trip.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)

  if request.method == 'GET':
    serializer = TripSerializer(trip)
    return Response(serializer.data)
  elif request.method in ['PUT', 'DELETE']:
      # check logged in user is owner
    # print('Dumpling owner:', dumpling.owner)
    # print('Request user:', request.user)
    
    # if dumpling.owner != request.user:
    #   return Response({'message': 'You do not have permission to edit or delete this dumpling.'}, status=status.HTTP_403_FORBIDDEN)
    if request.method == 'PUT':
      serializer = TripSerializer(trip, data=request.data)
      if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
      trip.delete()
      return Response(status=status.HTTP_204_NO_CONTENT)
# yes updated w/cookie
# class TripRegistrationView(APIView):
#   authentication_classes = [CookieTokenAuthentication]
#   permission_classes = [IsAuthenticated]

#   def get(self, request, trip_id):
#     is_registered = Registration.objects.filter(user=request.user, trip_id=trip_id).exists()
#     return Response({'isRegistered': is_registered})

#   def post(self, request, trip_id):
#     trip = get_object_or_404(Trip, pk=trip_id)
#     data = request.data.copy()
#     data.update({
#       'user': request.user.id,
#       'trip': trip.id
#     })
#     serializer = RegistrationSerializer(data=data)
#     if serializer.is_valid():
#       serializer.save()
#       return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
@authentication_classes([CookieTokenAuthentication])
@permission_classes([IsAuthenticated])
def trip_registration(request, trip_id):
  if request.method == 'GET':
    is_registered = Registration.objects.filter(user=request.user, trip_id=trip_id).exists()
    return Response({'isRegistered': is_registered})
  
  elif request.method == 'POST':
    trip = get_object_or_404(Trip, pk=trip_id)
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

class LotteryResultsView(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [IsAuthenticated]

  def get_user_info(self, registration):
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
  def get(self, request, trip_id):
    trip = get_object_or_404(Trip, pk=trip_id)
    accepted, waitlisted, rejected = trip.get_registrations_by_status()

    data = {
      'accepted': [self.get_user_info(r) for r in accepted],
      'waitlisted': [r.user.email for r in waitlisted],
      'rejected': [r.user.email for r in rejected],
    }
    return Response(data)
  # for testing lotto action
  def post(self, request, trip_id):
    trip = get_object_or_404(Trip, pk=trip_id)
    trip.run_lottery()
    return Response({'message': 'Lottery run success'})