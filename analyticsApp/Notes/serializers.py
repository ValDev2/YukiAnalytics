from rest_framework import serializers
from .models import Note
import time


class NoteDetailSerializer(serializers.ModelSerializer):

    user = serializers.SerializerMethodField()
    timestamp = serializers.SerializerMethodField("get_timestamp")
    value = serializers.SerializerMethodField()

    class Meta:
        model = Note
        fields = [
            "value",
            "user",
            "creation_date",
            "timestamp",
            "matiere",
            "id",
        ]

    def get_timestamp(self, obj):
        return time.mktime(obj.creation_date.timetuple()) * 1000

    def get_user(self, obj):
        print(obj.user)
        return str(obj.user.username)

    def get_value(self, obj):
        return NoteValueSerializer(obj).data

class NoteValueSerializer(serializers.Serializer):
    note = serializers.FloatField(max_value=20, min_value=0)
    coefficient = serializers.IntegerField(min_value=0, max_value=10)
