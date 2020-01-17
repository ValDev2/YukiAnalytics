from django.urls import path
from .views import UserListView, UserDetailView

urlpatterns = [
    path('api/users/', UserListView.as_view(), name="users"),
    path('api/users/<int:pk>/', UserDetailView.as_view(), name="user-detail"),
]
