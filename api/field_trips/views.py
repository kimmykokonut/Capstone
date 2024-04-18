from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import JsonResponse, HttpResponse
from .models import Profile, Registration, Trip, Mushroom
from .serializers import UserSerializer, ProfileSerializer, MushroomSerializer, TripSerializer, RegistrationSerializer
from rest_framework import status, generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User, Group
from django.shortcuts import get_object_or_404
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny

def welcome(request):
  return HttpResponse("Welcome to the OMS Field Trip API")

# User can login, signup, logout
@api_view(['POST'])
def login(request):
  user = get_object_or_404(User, username=request.data['username'])
  if not user.check_password(request.data['password']):
    return Response({"detail": "Not Found."}, status=status.HTTP_404_NOT_FOUND)
  token, created = Token.objects.get_or_create(user=user)
  serializer = UserSerializer(instance=user)
  return Response({"token": token.key, "user": serializer.data})

@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
  serializer = UserSerializer(data=request.data)
  if serializer.is_valid():
    user = serializer.save()
    #hash pw. so og not stored
    user.set_password(request.data['password'])
    #add user to member group
    group, created = Group.objects.get_or_create(name='Member')
    user.groups.add(group)
    user.save()
    #add profile to user
    Profile.objects.create(user=user)
    token = Token.objects.create(user=user)
    return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_201_CREATED)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
  return Response("passed for {}".format(request.user.email))

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
def logout(request):
  #deletes token
  request.user.auth_token.delete()
  return Response("logged out: {}".format(request.user.email), status=status.HTTP_200_OK)

# User can add details to their profile
@api_view(['GET', 'PUT'])
@authentication_classes([TokenAuthentication])
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

class TripRegistrationView(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [IsAuthenticated]

  def post(self, request, trip_id):
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