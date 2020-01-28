from django.shortcuts import render
from rest_framework import generics
from .serializers import (
    MatiereListSerializer,
    MatiereDetailSerializer
)
from .models import Matiere
from .permissions import IsOwner

#Listing Matieres
class MatiereListView(generics.ListCreateAPIView):
    serializer_class = MatiereListSerializer
    permissions_class = [IsOwner]

    def get_queryset(self):
        return Matiere.objects.filter(user=self.request.user)

class MatiereDetailView(generics.RetrieveAPIView):
    serializer_class = MatiereDetailSerializer
    permissions_class = [IsOwner]
    lookup_field = "slug"
    def get_queryset(self):
        return Matiere.objects.filter(user=self.request.user)
