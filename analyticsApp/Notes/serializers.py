from rest_framework import serializers
from .models import Note

import time


class NoteSerializer(serializers.ModelSerializer):

    username = serializers.ReadOnlyField(source="get_username")
    timestamp = serializers.SerializerMethodField("get_timestamp")

    class Meta:
        model = Note
        fields = "__all__"


    def get_timestamp(self, obj):
        return time.mktime(obj.date.timetuple()) * 1000
