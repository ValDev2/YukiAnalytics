from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import Relationship
from django.core.exceptions import ValidationError
import time
from django.contrib.auth import get_user_model
User = get_user_model()


class CustomTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ('user')



class UserSerializer(serializers.ModelSerializer):
    followers_count = serializers.IntegerField(source="get_followers_count")
    following_count = serializers.IntegerField(source="get_following_count")

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "followers_count",
            "following_count",
            "niveau"
        ]



class UserDetailSerializer(serializers.HyperlinkedModelSerializer):
    location = serializers.CharField(source="ville")
    created_at = serializers.DateTimeField(source="creation_date")
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    followers = serializers.HyperlinkedIdentityField(
        view_name="user-api:user-followers-list",
        lookup_field="pk"
    )

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "followers_count",
            "following_count",
            "followers",
            # "following",
            "location",
            "created_at",
        ]

    def get_followers_count(self, obj):
        return int(obj.get_followers_count())

    def get_following_count(self, obj):
        return int(obj.get_following_count())


class CreateRelationshipSerializer(serializers.ModelSerializer):
    timestamp = serializers.SerializerMethodField()
    relationship_status = serializers.ReadOnlyField(source="status")
    class Meta:
        model = Relationship
        fields = [
            "id",
            "to_user",
            "date",
            "timestamp",
            "relationship_status"
        ]

    def validate(self, data):
        data["from_user"] = self.context["request"].user
        print(data)
        if Relationship.objects.filter(**data).exists():
            raise ValidationError(f"Vous avez déjà envoyé cette demande à {data['to_user']}")
        elif data["to_user"] == data["from_user"]:
            raise ValidationError(f"Emetteur et receveur doivent être différent")
        return data

    def create(self, validated_data):
        to_user = validated_data["to_user"]
        validated_data["status"] = self.context["relationship_status"]
        status = validated_data["status"]
        validated_data["from_user"] = self.context["request"].user
        print(validated_data["from_user"])
        return validated_data["from_user"].add_relationship(to_user=to_user, status=status)

    def get_timestamp(self, obj):
        return time.mktime(obj.date.timetuple()) * 1000


class RelationshipSerializer(serializers.ModelSerializer):
    timestamp = serializers.SerializerMethodField()
    class Mata:
        model = Relationship
        fields = [
            "id",
            "from_user",
            "to_user",
            "status",
            "timestamp"
        ]
        
    def get_timestamp(self, obj):
        return time.mktime(obj.creation_date.timetuple()) * 1000
