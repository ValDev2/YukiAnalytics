from rest_framework import serializers
from .models import User
from rest_framework.authtoken.models import Token
from .models import Relationship


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = "__all__"

    def create(self, validated_data):
        user = User(
            username=validated_data["email"],
        )
        user.set_password(validated_data["password"])
        user.save()
        return user


class CustomTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ('user')



class CreateRelationshipSerializer(serialiezrs.ModelSerializer):
    class Meta:
        model = Relationship
        fields = ["to_user", "status"]

    def create(self, validated_data):
        validated_data["from_user"] = self.context["request"].user
        return Relationship.objects.create(**validated_data)

    def validate(self, data):
        if Relationship.objects.filter(**data).exists():
            raise ValidationError(f"Vous avez déjà envoyé cette demande à {data["to_user"]}")
        elif data["from_user"] == data["to_user"]:
            raise ValidationError(f"Emetteur et receveur doivent être différent")
        return data



class RelationshipDetailSerializer(serializers.ModelSerializer):
    timestamp = serializers.SerializerMethodField()
    class Mata:
        model = Relationship
        fields = ["id","from_user", "to_user", "status", "timestamp"]

    def get_timestamp(self, obj):
        return time.mktime(obj.creation_date.timetuple()) * 1000
