from django.contrib import admin
from django.urls import path, include
from .views import CustomLoginView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('frontend.urls')),
    path('', include('Notes.urls', namespace="note-api")),
    path('', include('Matiere.urls', namespace="matiere-api")),
    path('', include('User.urls', namespace="user-api")),
    path('rest-auth/login/', CustomLoginView.as_view(), name="login"),
    path('rest-auth/registration/', include('rest_auth.registration.urls'))
]
