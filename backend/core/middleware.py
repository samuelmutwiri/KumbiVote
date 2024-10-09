import jwt
from django.conf import settings
from django.http import JsonResponse


class PublicKeyVerificationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # This will handle all HTTP requests (including those that initiate WebSocket connections)
        if request.path.startswith("/ws/"):  # Apply to WebSocket connections
            public_key = settings.PUBLIC_KEY

            token = request.headers.get("Authorization")
            if not token:
                return JsonResponse(
                    {"error": "Authorization token is missing"}, status=401
                )

            try:
                # Verify the JWT token using the public key
                jwt.decode(
                    token, public_key, algorithms=["RS256"]
                )  # Adjust algorithm based on your setup
            except jwt.ExpiredSignatureError:
                return JsonResponse({"error": "Token has expired"}, status=401)
            except jwt.InvalidTokenError:
                return JsonResponse({"error": "Invalid token"}, status=401)

        response = self.get_response(request)
        return response
