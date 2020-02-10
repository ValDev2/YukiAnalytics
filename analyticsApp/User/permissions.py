from rest_framework import permissions

class IsOwner(permissions.BasePermission):

    message = "Tu dois avoir créé cette matière pour y accéder"

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user

class IsNotBlocked(permissions.BasePermission):

    message = "Vous avez été bloqué par l'utilisateur "

    def has_object_permission(self, request, view, obj):
        print(obj.username)
        print(obj.get_blocked_users())
        return not request.user in obj.get_blocked_users()
