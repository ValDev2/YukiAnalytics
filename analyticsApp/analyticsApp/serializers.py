from rest_framework.authtoken.models import Token
from rest_framework import serializers


class CustomTokenSerializer(serializers.ModelSerializer):

    user_id = serializers.SerializerMethodField()

    class Meta:
        model = Token
        fields = ["key", "user_id"]

    def get_user_id(self, obj):
        return obj.user.id
