from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone

from .models import CustomUser, UserActivity


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def save_user_profile(sender, instance, **kwargs):
    instance.userprofile.save()


@receiver(post_save, sender=CustomUser)
def log_user_creation(sender, instance, created, **kwargs):
    if created:
        # Log user creation
        UserActivity.objects.create(
            user=instance,
            url="/register/",
            action="User Registered",
            timestamp=timezone.now(),
        )


@receiver(post_save, sender=CustomUser)
def log_user_update(sender, instance, **kwargs):
    # Log user updates
    UserActivity.objects.create(
        user=instance,
        url="/profile/",
        action="User Updated Profile",
        timestamp=timezone.now(),
    )

