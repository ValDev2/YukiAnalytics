from rest_framework import serializers
from .models import Note
from Matiere.serializers import MatiereSerializer


class NoteSerializer(serializers.ModelSerializer):

    matiere = MatiereSerializer()

    class Meta:
        model = Note
        fields = "__all__"
