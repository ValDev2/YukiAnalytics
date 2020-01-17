from django.contrib import admin
from django.urls import path, include
from .views import CustomLoginView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('frontend.urls')),
    path('', include('Notes.urls')),
    path('', include('Matiere.urls')),
    path('', include('User.urls')),
    path('rest-auth/login/', CustomLoginView.as_view(), name="login"),
    path('rest-auth/registration/', include('rest_auth.registration.urls'))
]
