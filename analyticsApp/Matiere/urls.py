from django.urls import path
from .views import (MatiereListView,
                    MatiereDetailView,
                    )


urlpatterns = [
    path('api/matieres', MatiereListView.as_view(), name="matieres"),
    path('api/matieres/<slug:slug>', MatiereDetailView.as_view(), name="matiere")
]
