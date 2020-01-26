from django.shortcuts import render
from rest_framework import generics
from django.contrib.auth import get_user_model
User = get_user_model()
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated

class UserListView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = "pk"
    permission_classes = [IsAuthenticated]
