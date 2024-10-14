# import base64
# import datetime
#
# import jwt
# from cryptography import x509
# from cryptography.hazmat.primitives import hashes
# from cryptography.hazmat.primitives.asymmetric import padding
# from django.conf import settings
# from django.http import JsonResponse
# from django.utils.deprecation import MiddlewareMixin
# from rest_framework import authentication, exceptions
# from rest_framework_simplejwt.exceptions import (
#     InvalidToken,
#     TokenError,
# )
# from rest_framework_simplejwt.tokens import UntypedToken
#
#
# class PKIAuthentication(authentication.BaseAuthentication):
#     def authenticate(self, request):
#         auth_header = request.META.get("HTTP_AUTHORIZATION")
#         if not auth_header:
#             return None
#
#         try:
#             method, signature = auth_header.split()
#             if method.lower() != "pki":
#                 return None
#
#             client_cert = x509.load_pem_x509_certificate(
#                 request.META.get("HTTP_X_CLIENT_CERT").encode()
#             )
#             public_key = client_cert.public_key()
#
#             # Verify the signature
#             public_key.verify(
#                 base64.b64decode(signature),
#                 request.body,
#                 padding.PSS(
#                     mgf=padding.MGF1(hashes.SHA256()),
#                     salt_length=padding.PSS.MAX_LENGTH,
#                 ),
#                 hashes.SHA256(),
#             )
#
#             # If verification succeeds, issue a JWT token
#             token = jwt.encode(
#                 {
#                     "sub": client_cert.subject.rfc4514_string(),
#                     "exp": datetime.datetime.utcnow()
#                     + datetime.timedelta(hours=1),
#                 },
#                 settings.SECRET_KEY,
#                 algorithm="HS256",
#             )
#
#             return (None, token)
#         except Exception:
#             raise exceptions.AuthenticationFailed("Invalid signature")
#
#     def authenticate_header(self, request):
#         return "PKI"
#
#
# class PublicKeyVerificationMiddleware:
#     def __init__(self, get_response):
#         self.get_response = get_response
#
#     def __call__(self, request):
#         # This will handle all HTTP requests (including those that initiate WebSocket connections)
#         if request.path.startswith("/ws/"):  # Apply to WebSocket connections
#             public_key = settings.PUBLIC_KEY
#
#             token = request.headers.get("Authorization")
#             if not token:
#                 return JsonResponse(
#                     {"error": "Authorization token is missing"}, status=401
#                 )
#
#             try:
#                 # Verify the JWT token using the public key
#                 jwt.decode(
#                     token, public_key, algorithms=["RS256"]
#                 )  # Adjust algorithm based on your setup
#             except jwt.ExpiredSignatureError:
#                 return JsonResponse({"error": "Token has expired"}, status=401)
#             except jwt.InvalidToken:
#                 return JsonResponse({"error": "Invalid token"}, status=401)
#
#         response = self.get_response(request)
#         return response
#
#
# class TokenVerificationMiddleware(MiddlewareMixin):
#     """
#     Verify JWT token in the Authorization header of the request
#     """
#
#     def process_request(self, request):
#         token = request.headers.get("Authorization", "").split(" ")[1]
#         try:
#             UntypedToken(token)
#         except (InvalidToken, TokenError):
#             return JsonResponse({"error": "Invalid token"}, status=401)
