from rest_framework import serializers
from .models import Matiere
from django.template.defaultfilters import slugify
from Notes.serializers import NoteSerializer
from User.serializers import UserSerializer
from Notes.models import Note

class MatiereSerializer(serializers.ModelSerializer):

    slug = serializers.ReadOnlyField()
    notes = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()
    user_id = serializers.SerializerMethodField()
    note_moyenne = serializers.SerializerMethodField()
    moyenne_traceback = serializers.SerializerMethodField()

    class Meta:
        model = Matiere
        fields = "__all__"

    def create(self, validated_data):
        data = {**validated_data}
        data["slug"] = slugify(validated_data["nom"])
        data["user"] = self.context["request"].user
        print(data)
        return Matiere.objects.create(**data)

    def get_notes(self, obj):
        return NoteSerializer(Note.objects.filter(matiere=obj.id), many=True).data

    def get_username(self, obj):
        return obj.user.username

    def get_user_id(self, obj):
        return obj.user.id

    def get_note_moyenne(self, obj):
        return obj.moyenne_traceback()["moyenne"]

    def get_moyenne_traceback(self, obj):
        return obj.moyenne_traceback()["moyenne_traceback"]
