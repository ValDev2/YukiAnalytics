from django.urls import path
from .views import MatiereListView

urlpatterns = [
    path('api/matieres', MatiereListView.as_view(), name="matieres"),
]
