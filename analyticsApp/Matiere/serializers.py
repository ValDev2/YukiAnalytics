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
    notes = serializers.SerializerMethodField()
    type = serializers.CharField(source="get_type")
    difficulte = serializers.CharField(source="get_difficulte")
    class Meta:
        model = Matiere
        fields = [
            "nom",
            "id",
            "slug",
            "user",
            "type",
            "coefficient",
            "difficulte",
            "notes"
        ]
    def get_user(self, obj):
        return str(obj.user.username)

    def get_notes(self, obj):
        notes = obj.notes()
        return NoteDetailSerializer(notes,many=True).data

class MatiereCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matiere
        fields = [
            "nom",
            "type",
            "coefficient",
            "difficulte"
        ]

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return Matiere.obejcts.create(**validated_data)

    def validated_data(self, data):
        matieres = [matiere.nom for matiere in Matiere.objects.all()]
        if data["nom"] in matieres:
            raise serializers.ValidationError("Matière déjà existante ")
