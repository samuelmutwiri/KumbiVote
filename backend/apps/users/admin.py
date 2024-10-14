import logging

from django.contrib import admin

from .models import User

logger = logging.getLogger("admin")


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        "gender",
        "full_name",
        "email",
        "phone_no",
        "is_staff",
        "is_active",
        "is_superuser",
        "created",
    )
    search_fields = (
        "first_name",
        "middle_name",
        "last_name",
        "email",
        "document_id",
        "phone_no",
    )
    list_filter = (
        "is_staff",
        "is_active",
        "is_superuser",
        "gender",
        "id_type",
        "is_staff",
        "is_superuser",
        "is_active",
    )
    ordering = ("-created", "is_staff", "is_superuser", "is_active")

    def full_name(self, obj):
        return f"{obj.first_name} {obj.middle_name} {obj.last_name}"

    full_name.short_description = "Name"
