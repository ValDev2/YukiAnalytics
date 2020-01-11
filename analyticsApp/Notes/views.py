from django.shortcuts import render
from .models import Note
from .serializers import NoteSerializer
from rest_framework import generics
from rest_framework.permissions import IsAdminUser


class NotesListView(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = []
