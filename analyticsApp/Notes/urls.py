from django.urls import path
from .views import NotesListView


urlpatterns = [
    path('api/notes/', NotesListView.as_view(), name="notes"),
]
