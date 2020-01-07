from django.shortcuts import render
from .models import Matiere
from .serializers import MatiereSerializer
from rest_framework import generics
from rest_framework.permissions import IsAdminUser
# Create your views here.


class MatiereListView(generics.ListCreateAPIView):
    queryset = Matiere.objects.all()
    serializer_class = MatiereSerializer
    permission_classes = [IsAdminUser]
