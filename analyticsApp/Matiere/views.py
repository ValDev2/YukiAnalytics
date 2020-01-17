from django.shortcuts import render
from .models import Matiere
from .serializers import MatiereSerializer
from User.serializers import UserSerializer
from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .permissions import IsOwner
from rest_framework.response import Response

# Create your views here.


class MatiereListView(generics.ListCreateAPIView):
    queryset = Matiere.objects.all()
    serializer_class = MatiereSerializer
    permission_classes = [IsAuthenticated, ]


class MatiereDetailView(generics.RetrieveAPIView):
    queryset = Matiere.objects.all()
    serializer_class = MatiereSerializer
    permission_classes = [IsOwner, ]
    lookup_field = "slug"
