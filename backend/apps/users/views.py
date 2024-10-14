from django.contrib.auth.models import User
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import User
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API ViewSet to manage users.
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=True, methods=["post"])
    def set_password(self, request, pk=None):
        user = self.get_object()  # noqa
        serializer = SetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            user.set_password(serializer.validated_data["password"])
            user.save()
            return Response({"status": "password set"})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
