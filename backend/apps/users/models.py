import uuid

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser):
    GENDER = {
        "M": "Male",
        "F": "Female",
    }
    ID_TYPE = {
        "IDCARD": "Identity Card",
        "PASSPORT": "Passport",
        "ALIENID": "Alien ID",
    }

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    middle_name = models.CharField(max_length=30, blank=True)
    surname = models.CharField(max_length=30, blank=True)
    id_type = models.CharField(choices=ID_TYPE, blank=False)
    document_id = models.CharField(max_length=50, blank=True)
    document_expiry_date = models.DateField(null=True, blank=True)
    phone_no = models.CharField(max_length=20, blank=True)
    gender = models.CharField(choices=GENDER, blank=False)
    dob = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, default="active")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    blockchain_id = models.CharField(max_length=100, blank=True)

    """
    TODO:
    1. Extend with User Profilev
    2. Modify model for OAuth2
    3. Connect to Oauth2 Google, Meta, Apple
    4. Connect model to blockchain
    5. Implement ZKP
    """

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email


class Profile(User):
    """
    User Profile
    Manages a user profile
    """

    pass


class UserActivity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    activity_type = models.CharField(max_length=50)
    description = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-timestamp"]
