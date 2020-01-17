from rest_framework import serializers
from .models import Matiere
from django.template.defaultfilters import slugify
from Notes.serializers import NoteSerializer
from User.serializers import UserSerializer
from Notes.models import Note

class MatiereSerializer(serializers.ModelSerializer):

    slug = serializers.ReadOnlyField()
    notes = serializers.SerializerMethodField()
    user = UserSerializer(read_only=True)

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
