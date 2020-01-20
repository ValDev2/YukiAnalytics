from rest_framework import serializers
from .models import User
from rest_framework.authtoken.models import Token


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
