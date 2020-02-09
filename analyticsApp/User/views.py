from django.shortcuts import render
from rest_framework import generics
from django.contrib.auth import get_user_model
User = get_user_model()
from .serializers import (
    UserSerializer,
    RelationshipSerializer,
    CreateRelationshipSerializer
)
from rest_framework.permissions import IsAuthenticated

class UserListView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = "pk"
    permission_classes = [IsAuthenticated]

class UserFollowersListView(generics.ListAPIView):
    serializer_class = UserSerializer
    lookup_field = "pk"
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return user.get_followers()

class UserFollowingListView(generics.ListAPIView):
    serializer_class = UserSerializer
    lookup_field = "pk"
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return user.get_following()

class UserBlockedUserListView(generics.ListAPIView):
    serializer_class = UserSerializer
    lookup_field = "pk"
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return user.get_blocked_users()


class UserBlockingUserListView(generics.ListAPIView):
    serializer_class = UserSerializer
    lookup_field = "pk"
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return user.get_blocking_users()

class FollowCreateView(generics.CreateAPIView):
    serializer_class = CreateRelationshipSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self, *args, **kwargs):
        context = super().get_serializer_context()
        #status 1 = follow
        context["relationship_status"] = 1
        return context

class FollowDestroyView(generics.DestroyAPIView):
    serializer_class = RelationshipSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return user.get_following()

    def delete(self, *args, **kwargs):
        return s
