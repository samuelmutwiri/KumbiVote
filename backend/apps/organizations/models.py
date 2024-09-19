from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class OrganizationType(models.Model):
    """ Type of organization."""

    name = models.CharField(blank=False, null=False)
    is_active = models.BooleanField(default=True)



class Organization(models.Model):
    """
    Manages Organization
    """

    name = models.CharField(max_length=255)
    org_type = models.ForeignKey(
        OrganizationType,
        on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class OrganizationalProfile(Organization):
    block_addr = models.CharField(max_length=255)
    country_id = models.IntegerField()
    hq_addr = models.IntegerField()
    description = models.TextField(blank=True, null=True)


class OrganizationalUnit(models.Model): name = models.CharField(max_length=255)
    organization = models.ForeignKey(
        Organization, on_delete=models.CASCADE, related_name="units"
    )
    parent_unit = models.ForeignKey(
        "self",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="subunits",
    )

    def __str__(self):
        return f"{self.name} - {self.organization.name}"


class Branch(models.Model):
    name = models.CharField(max_length=255)
    unit = models.ForeignKey(
        OrganizationalUnit, on_delete=models.CASCADE, related_name="branches"
    )

    def __str__(self):
        return f"{self.name} - {self.unit.name}"


class Position(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    branch = models.ForeignKey(
        Branch, on_delete=models.CASCADE, related_name="positions"
    )

    def __str__(self):
        return f"{self.name} - {self.branch.name}"


class Member(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    organization = models.ForeignKey(
        Organization, on_delete=models.CASCADE, related_name="members"
    )
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, related_name="members")
    position = models.ForeignKey(
        Position,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="members",
    )

    def __str__(self):
        return f"{self.user.username} - {self.branch.name} - {self.position.name if self.position else 'No position'}"
