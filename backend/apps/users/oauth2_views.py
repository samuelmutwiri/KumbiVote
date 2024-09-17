import json

from django.utils.decorators import method_decorator
from django.views.decorators.debug import sensitive_post_parameters
from oauth2_provider.contrib.rest_framework import (OAuth2Authentication,
                                                    TokenHasScope)
from oauth2_provider.models import AccessToken
from oauth2_provider.views.generic import ProtectedResourceView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.views import APIView


class UserInfoView(ProtectedResourceView, APIView):
    @method_decorator(sensitive_post_parameters("password"))
    def get(self, request):
        user = request.user
        return Response(
            {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
            }
        )


class TokenView(APIView):
    throttle_classes = [AnonRateThrottle]

    @method_decorator(sensitive_post_parameters("password"))
    def post(self, request):
        from oauth2_provider.models import get_application_model
        from oauth2_provider.views.mixins import OAuthLibMixin

        mixin = OAuthLibMixin()
        uri, headers, body, status = mixin.create_token_response(request)

        if status == 200:
            body = json.loads(body)
            access_token = body.get("access_token")
            if access_token:
                token = AccessToken.objects.get(token=access_token)
                application = get_application_model().objects.get(
                    client_id=body.get("client_id")
                )
                token.application = application
                token.save()

        response = Response(data=json.loads(body), status=status)
        for k, v in headers.items():
            response[k] = v
        return response


class LogoutView(APIView):
    def post(self, request):
        token = AccessToken.objects.get(token=request.auth)
        token.delete()
        return Response(
            {"success": "Successfully logged out"}, status=status.HTTP_200_OK
        )


class RevokeTokenView(APIView):
    authentication_classes = [OAuth2Authentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        from oauth2_provider.views.mixins import OAuthLibMixin

        mixin = OAuthLibMixin()
        uri, headers, body, status = mixin.create_revocation_response(request)

        response = Response(data=json.loads(body) if body else {}, status=status)
        for k, v in headers.items():
            response[k] = v
        return response


class ProtectedView(APIView):
    permission_classes = [TokenHasScope]
    required_scopes = ["read", "write"]
