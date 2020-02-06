from rest_framework import serializers
from datetime import datetime
from .models import Note
from django.contrib.auth import get_user_model
User = get_user_model()
import time


class NoteDetailSerializer(serializers.ModelSerializer):

    user = serializers.SerializerMethodField()
    timestamp = serializers.SerializerMethodField()
    value = serializers.SerializerMethodField()

    class Meta:
        model = Note
        fields = [
            "value",
            "user",
            "creation_date",
            "total_time",
            "difficulte",
            "satisfaction",
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


class NoteCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = [
            "creation_date",
            "total_time",
            "difficulte",
            "satisfaction",
            "coefficient",
            "note",
            "matiere",
            "id",
        ]

    def validate(self, data):
        if data["coefficient"] > 10:
            raise serializers.ValidationError("Coefficient trop élevé")
        return data

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        validated_data["creation_date"] = datetime.now()
        return Note.objects.create(**validated_data)



class NoteValueSerializer(serializers.Serializer):
    note = serializers.FloatField(max_value=20, min_value=0)
    coefficient = serializers.IntegerField(min_value=0, max_value=10)
