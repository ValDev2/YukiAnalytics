from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from .models import Semestre
from .permissions import IsOwner


class SemestreListView(ListCreateAPIView):
    permissions_classes = [IsOwner]

    def get_queryset(self):
        user = self.request.user
        return Semestre.objects.filter(user=user)
