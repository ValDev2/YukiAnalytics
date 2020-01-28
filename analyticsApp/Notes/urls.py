from django.urls import path
from .views import (
    NoteListView,
    NoteDetailView,
    NoteCreateView
)

app_name = "Notes"

urlpatterns = [
    path("api/notes/create/", NoteCreateView.as_view(), name="note-create"),
    path("api/notes/<int:id>", NoteDetailView.as_view(), name="note-detail"),
    path("api/notes/<slug:slug>", NoteListView.as_view(), name="note-list"),
]
