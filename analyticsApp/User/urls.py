from django.urls import path
from .views import (
    UserListView,
    UserDetailView
)

app_name="User"

urlpatterns = [
    path("api/users/", UserListView.as_view(), name="user-list"),
    path("api/users/<int:pk>/", UserDetailView.as_view(), name="user-detail"),
]
