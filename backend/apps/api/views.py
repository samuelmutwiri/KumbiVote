import logging

from django.conf import settings
from rest_framework.decorators import action
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

logger = logging.getLogger("django.request")


class CookieTokenObtainPairView(TokenObtainPairView):
    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get("access"):
            response.set_cookie(
                settings.SIMPLE_JWT["AUTH_COOKIE"],
                response.data["access"],
                max_age=settings.SIMPLE_JWT[
                    "ACCESS_TOKEN_LIFETIME"
                ].total_seconds(),
                httponly=True,
                samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
                secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
            )
            del response.data["access"]
        if response.data.get("refresh"):
            response.set_cookie(
                settings.SIMPLE_JWT["AUTH_COOKIE_REFRESH"],
                response.data["refresh"],
                max_age=settings.SIMPLE_JWT[
                    "REFRESH_TOKEN_LIFETIME"
                ].total_seconds(),
                httponly=True,
                samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
                secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
            )
            del response.data["refresh"]
        return super().finalize_response(request, response, *args, **kwargs)


class CookieTokenRefreshView(TokenRefreshView):
    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get("access"):
            response.set_cookie(
                settings.SIMPLE_JWT["AUTH_COOKIE"],
                response.data["access"],
                max_age=settings.SIMPLE_JWT[
                    "ACCESS_TOKEN_LIFETIME"
                ].total_seconds(),
                httponly=True,
                samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
                secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
            )
            del response.data["access"]
        return super().finalize_response(request, response, *args, **kwargs)


class SystemView(APIView):
    renderer_classes = [JSONRenderer]

    @action(detail=False, methods=["get"])
    def get(self, request, *args, **kwargs):
        data = {"message": "Endpoint api/sys/ works!!"}
        return Response(data, status=200)

    @action(detail=False, methods=["post"])
    def post(self, request, *args, **kwargs):
        message = request.data.get("message")
        if message:
            logger.info(message)
            return Response({"status": "Logged"}, status=200)
        return Response({"error": "No message provided"}, status=400)

    @action(detail=False, methods=["post"])
    def log(request):
        message = request.data.get("message")
        if message:
            logger.info(message)
            return Response({"status": "Logged!"}, status=200)
        return Response({"error": "No message provided"}, status=400)
