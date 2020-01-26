from rest_framework import serializers
from .models import Matiere
from Notes.serializers import NoteDetailSerializer


class MatiereListSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name="matiere-api:matiere-detail",
        lookup_field="slug"
    )
    class Meta:
        model = Matiere
        fields = [
            "id",
            "url"
        ]

class MatiereDetailSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    url = serializers.HyperlinkedIdentityField(
        view_name="note-api:note-list",
        lookup_field="slug"
    )
    class Meta:
        model = Matiere
        fields = [
            "nom",
            "slug",
            "user",
            "type",
            "coefficient",
            "difficulte",
            "url"
        ]
    def get_user(self, obj):
        return str(obj.user.username)
