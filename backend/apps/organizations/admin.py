from django.contrib import admin

from .models import (
    Body,
    Branch,
    Incumbent,
    Member,
    Organization,
    OrganizationalUnit,
    Position,
    Term,
)

admin.site.register(Organization)
admin.site.register(OrganizationalUnit)
admin.site.register(Branch)
admin.site.register(Body)
admin.site.register(Term)
admin.site.register(Position)
admin.site.register(Incumbent)
admin.site.register(Member)
