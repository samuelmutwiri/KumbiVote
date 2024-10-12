import uuid

from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """Create and return a regular user with an email and password."""
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """Create and return a superuser."""
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """Manage Users."""

    GENDER = {"M": "Male", "F": "Female"}
    ID_TYPE = {
        "IDCARD": "Identity Card",
        "PASSPORT": "Passport",
        "ALIENID": "Alien ID",
    }
    OAUTH_PROVIDERS = {
        "GOOGLE": "Google",
        "FACEBOOK": "Facebook",
        "GITHUB": "Github",
        "TWITTER": "Twitter",
        "APPLE": "Apple",
        "NONE": "None",
    }
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True, blank=False, null=False)
    first_name = models.CharField(max_length=30, blank=False, null=False)
    middle_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=30, blank=True, null=False)
    phone_no = models.CharField(
        max_length=20, blank=True, unique=True, null=True
    )
    created = models.DateTimeField(auto_now_add=True)
    gender = models.CharField(
        choices=GENDER, blank=True, default=None, null=True
    )
    id_type = models.CharField(choices=ID_TYPE, blank=False, default="IDCARD")
    document_id = models.CharField(max_length=50, blank=True, unique=True)
    document_expiry_date = models.DateField(
        default=None, blank=True, null=True
    )
    dob = models.DateField(default=None, blank=True, null=True)
    blockchain_id = models.CharField(
        max_length=100, blank=True, default=None, null=True
    )
    profile_photo = models.CharField(
        max_length=225, blank=True, default=None, null=True
    )
    oauth_provider = models.CharField(
        choices=OAUTH_PROVIDERS, blank=True, default=None, null=True
    )
    updated = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    """ Use custom user manager."""
    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    def __str__(self):
        return self.email

    class Meta:
        default_related_name = "%(app_label)s_%(model_name)s"
        ordering = ["-created"]
        indexes = [
            models.Index(fields=["uuid"], name="uuidx"),
            models.Index(
                fields=["first_name", "middle_name", "last_name"], name="namex"
            ),
            models.Index(fields=["phone_no"], name="phonex"),
            models.Index(fields=["email"], name="emailx"),
            models.Index(fields=["created"], name="timex"),
            models.Index(fields=["gender"], name="genderx"),
            models.Index(fields=["dob"], name="dobx"),
            models.Index(fields=["blockchain_id"], name="blockidx"),
        ]
        unique_together = ["first_name", "last_name", "email"]
        verbose_name = "user"
        verbose_name_plural = "users"
