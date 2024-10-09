import uuid

from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager,
                                        PermissionsMixin)
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """
        Create and return a regular user with an email and password.
        """
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Create and return a superuser
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("is_staff flag must be ON for superusers!")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("is_superuser flag must be ON for superusers!")

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    """
    Manage Users
    """

    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True, blank=False, null=False)
    first_name = models.CharField(max_length=30, blank=False, null=False)
    middle_name = models.CharField(max_length=30, blank=True)
    surname = models.CharField(max_length=30, blank=True, null=False
    phone_no = models.CharField(max_length=20, blank=True, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    """ Use custom user manager."""
    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "surname"]

    def __str__(self):
        return self.email

    class Meta:
        default_related_name = "%(app_label)s_%(model_name)s"
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["uuid"], name="uuidx"),
            models.Index(fields=["email"], name="emailx"),
            models.Index(fields=["created_at"], name="timex"),
        ]
        unique_together = ["first_name", "surname", "email"]
        verbose_name = "user"
        verbose_name_plural = "users"


class UserProfile(models.Model):
    """
    User Profile
    """

    GENDER = [("M", "Male"), ("F", "Female")]
    ID_TYPE = [
        ("IDCARD", "Identity Card"),
        ("PASSPORT", "Passport"),
        ("ALIENID", "Alien ID"),
    ]
    OAUTH_PROVIDERS = [
        ("GOOGLE", "Google"),
        ("FACEBOOK", "Facebook"),
        ("GITHUB", "Github"),
        ("TWITTER", "Twitter"),
        ("APPLE", "Apple"),
        ("NONE", "None"),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    gender = models.CharField(choices=GENDER, blank=True, null=True)
    id_type = models.CharField(choices=ID_TYPE, blank=False)
    document_id = models.CharField(max_length=50, blank=True, unique=True)
    document_expiry_date = models.DateField(null=True, blank=True)
    dob = models.DateField(null=True, blank=True)
    blockchain_id = models.CharField(max_length=100, blank=True)
    profile_photo = models.CharField(max_length=225, blank=True, null=True)
    oauth_provider = models.CharField(choices=OAUTH_PROVIDERS, blank=True, null=True)

    def __str__(self):
        return self.user.email

    class Meta:
        default_related_name = "%(app_label)s_%(model_name)s"
        indexes = [
            models.Index(fields=["gender"], name="genderx"),
            models.Index(fields=["dob"], name="dobx"),
            models.Index(fields=["blockchain_id"], name="blockidx"),
            models.Index(fields=["phone_no"], name="phonex"),
        ]
        verbose_name = "profile"
        verbose_name_plural = "profiles"


class ActivityLog(models.Model):
    """
    Log Activities
    """

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    session = models.CharField(max_length=225, blank=False, null=False)
    resource = models.CharField(max_length=225, blank=False, null=False)
    action = models.CharField(max_length=225, blank=False, null=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    def log(self, user, **details):
        entry = ActivityLog.objects.create(user=user, **details)
        entry.save()

    class Meta:
        ordering = ["-timestamp"]
        indexes = [
            models.Index(fields=["session"], name="sessionx"),
            models.Index(fields=["resource"], name="resourcex"),
        ]
