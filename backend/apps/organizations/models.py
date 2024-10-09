from django.contrib.auth import get_user_model
from django.db import models

from apps.elections import Polls

User = get_user_model()


class OrganizationType(models.Model):
    """Type of organization."""

    name = models.CharField(blank=False, null=False)
    is_active = models.BooleanField(default=True)


class Organization(models.Model):
    """
    Manages Organization
    """

    name = models.CharField(max_length=255)
    org_type = models.ForeignKey(OrganizationType, on_delete=models.CASCADE)
    block_addr = models.CharField(max_length=255)
    country_id = models.IntegerField()
    hq_addr = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class OrganizationalUnit(Organization):
    name = models.CharField(max_length=255)
    parent_id = models.OneToOneField(
        "self",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="%(class)s_parent",
    )

    def __str__(self):
        return f"{self.name}"


class Branch(Organization):
    name = models.CharField(max_length=255)
    unit = models.ForeignKey(
        OrganizationalUnit, on_delete=models.CASCADE, related_name="%(class)s"
    )

    def __str__(self):
        return f"{self.name} - {self.unit.name}"


class Body(Organization):
    LEVELS = {
        "organization": "Organization",
        "unit": "Organizational Unit",
        "branch": "Branch",
    }
    name = models.CharField(max_length=255)
    level = models.CharField(choices=LEVELS)
    is_active = models.BooleanField(default=True)


class Term(Body):
    poll = models.ForeignKey(Polls, on_delete=models.RESTRICT)
    cycle = models.IntegerField(default=12)
    starts = models.DateField()
    lapses = models.DateField()
    assumption = models.DateField()
    is_active = models.BooleanField(default=False)


class Position(Body):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.name}"


class Member(User):
    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE,
        related_name="%(class)s",
        blank=False,
        null=False,
    )
    unit = models.ForeignKey(
        OrganizationalUnit,
        on_delete=models.CASCADE,
        related_name="%(class)s",
        default=0,
    )
    branch = models.ForeignKey(
        Branch, on_delete=models.CASCADE, related_name="%(class)s", default=0
    )
    joined = models.DateField()
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.username}"


class Incumbent(Position):
    member = models.ForeignKey(Member, on_delete=models.RESTRICT)
    term = models.ForeignKey(Term, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    cycle = models.IntegerField(default=1)
    is_active = models.BooleanField(default=True)
