from rest_framework.exceptions import ValidationError
from rest_framework.views import exception_handler


def base_exception_handler(exc, context):
    response = exception_handler(exc, context)
    # check that a ValidationError exception is raised
    if response is not None:
        response.data["message"] = "HERE IS A CUSTOM MESSAGE ! "
        response.data["status_code"] = response.status_code

    return response
