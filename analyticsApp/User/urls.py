from django.urls import path
from .views import (
    UserListView,
    UserDetailView,
    UserFollowersListView,
    UserFollowingListView,
    UserBlockedUserListView,
    UserBlockingUserListView,
    FollowCreateView,
    FollowDestroyView
)

app_name="User"

urlpatterns = [
    path("api/users/", UserListView.as_view(), name="user-list"),
    path("api/users/<int:pk>/", UserDetailView.as_view(), name="user-detail"),
    path("api/users/<int:pk>/followers/list", UserFollowersListView.as_view(), name="user-followers-list"),
    path("api/users/<int:pk>/following/list", UserFollowingListView.as_view(), name="user-following-list"),
    path("api/users/<int:pk>/blocks/list", UserBlockedUserListView.as_view(), name="user-blocks-list"),
    path("api/users/<int:pk>/blocking/list", UserBlockingUserListView.as_view(), name="user-blocking-list"),
    path("api/follow/create", FollowCreateView.as_view(), name="follow-create"),
    path("api/follow/delete", FollowDestroyView.as_view(), name="follow-destroy")
]
