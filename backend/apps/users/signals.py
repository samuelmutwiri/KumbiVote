import logging

from django.contrib.auth.signals import (
    user_logged_in,
    user_logged_out,
    user_login_failed,
)
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import User  # noqa: F401

logger = logging.getLogger("django.contrib.auth")


@receiver(post_save, sender=User)
def log_superuser_creation(sender, instance, created, **kwargs):
    if created and instance.is_superuser:
        logger.info("Superuser %s created", instance.email)


@receiver(post_save, sender=User)
def log_superuser_password_change(sender, instance, created, **kwargs):
    if instance.is_superuser and "password" in instance.get_deferred_fields():
        logger.info("Superuser %s changed password", instance.email)


@receiver(user_logged_in)
def log_login(sender, request, user, **kwargs):
    logger.info("User %s logged in", user.email)


@receiver(user_logged_out)
def log_logout(sender, request, user, **kwargs):
    logger.info("User %s logged out", user.email)


@receiver(user_login_failed)
def log_login_failed(sender, credentials, request, **kwargs):
    logger.error("Failed login attempt with credentialsi %s", credentials)
