from django.urls import path
from .views import (
    MatiereListView,
    MatiereDetailView
)


app_name="Matiere"

urlpatterns = [
    path("api/matieres/", MatiereListView.as_view(), name="matiere-list"),
    path("api/matieres/<slug:slug>/", MatiereDetailView.as_view(), name="matiere-detail"),
]
