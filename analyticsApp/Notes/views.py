from rest_framework import generics
from .models import Note
from rest_framework.permissions import IsAuthenticated
from .serializers import (
    NoteDetailSerializer
)
from .permissions import IsOwner



class NoteListView(generics.ListCreateAPIView):
    serializer_class = NoteDetailSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        qs = Note.objects.all()
        matiere = self.kwargs.get("slug", None)
        user = self.request.user
        print(matiere)
        if matiere:
            qs = qs.filter(
                matiere__slug=matiere,
                user=user
            )
        return qs

class NoteDetailView(generics.RetrieveAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteDetailSerializer
    permission_classes = [IsAuthenticated, IsOwner]
    lookup_field = "id"
