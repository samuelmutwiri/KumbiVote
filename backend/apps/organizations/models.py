from django.db import models


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


class OrganizationalUnit(models.Model):
    name = models.CharField(max_length=255)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    parent_id = models.OneToOneField(
        "self",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name="%(class)s_parent",
    )

    def __str__(self):
        return f"{self.name}"


class Branch(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    ou = models.ForeignKey(
        OrganizationalUnit, on_delete=models.CASCADE, related_name="%(class)s"
    )

    def __str__(self):
        return f"{self.name} - {self.unit.name}"


class Body(models.Model):
    LEVELS = {
        "organization": "Organization",
        "unit": "Organizational Unit",
        "branch": "Branch",
    }
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    unit = models.ForeignKey(OrganizationalUnit, on_delete=models.CASCADE, null=True)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=255)
    level = models.CharField(choices=LEVELS)
    is_active = models.BooleanField(default=True)


class Term(models.Model):
    body = models.ForeignKey(Body, on_delete=models.CASCADE)
    poll = models.IntegerField(default=0, null=True, blank=True)
    cycle = models.DurationField()
    starts = models.DateField()
    lapses = models.DateField()
    assumption = models.DateField()
    is_active = models.BooleanField(default=False)


class Position(models.Model):
    body = models.ForeignKey(Body, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.name}"


class Member(models.Model):
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


class Incumbent(models.Model):
    position = models.ForeignKey(Position, on_delete=models.CASCADE)
    member = models.IntegerField(default=0)
    term = models.ForeignKey(Term, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    cycle = models.IntegerField(default=1)
    is_active = models.BooleanField(default=True)
