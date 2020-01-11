from rest_framework import serializers
from .models import Note
from Matiere.serializers import MatiereSerializer
import time


class NoteSerializer(serializers.ModelSerializer):

    username = serializers.ReadOnlyField(source="get_username")
    matiere_infos = serializers.SerializerMethodField()
    timestamp = serializers.SerializerMethodField("get_timestamp")

    class Meta:
        model = Note
        fields = "__all__"

    def get_matiere_infos(self, obj):
        matiere_obj = obj.matiere
        serializer = MatiereSerializer(matiere_obj)
        return serializer.data

    def get_timestamp(self, obj):
        return time.mktime(obj.date.timetuple()) * 1000
