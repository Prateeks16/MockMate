from django.urls import path

from django.shortcuts import render

# Create your views here.
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import generics, permissions
from rest_framework.authtoken.models import Token
from .models import InterviewSession
from .serializers import InterviewSessionSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=400)
    user = User.objects.create_user(username=username, password=password)
    return Response({'message': 'User created'}, status=201)

class InterviewSessionListCreate(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = InterviewSessionSerializer

    def get_queryset(self):
        user = self.request.user
        return InterviewSession.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

urlpatterns = [
    path('api/signup/', signup, name='signup'),
    path('api/login/', obtain_auth_token, name='login'),
]