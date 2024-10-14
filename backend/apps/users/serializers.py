from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "first_name",
            "middle_name",
            "last_name",
            "gender",
            "phone_no",
            "created",
            "updated",
            "is_active",
            "is_staff",
            "is_superuser",
        ]
        extra_kwargs = {"password": {"write_only": True}}


class PasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=128, write_only=True)
    confirm_password = serializers.CharField(max_length=128, write_only=True)

    def validate(self, data):
        if data["password"] != data["confirm_password"]:
            raise serializers.ValidationError("Passwords do not match.")
        return data
