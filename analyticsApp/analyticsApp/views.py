from django.shortcuts import render
from rest_auth.views import LoginView
from rest_auth.registration.views import RegisterView

class CustomLoginView(LoginView):
    def get_response(self):
        original_response = super().get_response()
        print("ORIGINAL RESPONSE")
        print(original_response)
        user_id = {"user_id": self.request.user.id}
        original_response.data.update(user_id)
        return original_response
