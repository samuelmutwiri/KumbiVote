from rest_framework import viewsets

from .models import (
    Body,
    Branch,
    Incumbent,
    Member,
    Organization,
    OrganizationalUnit,
    Position,
)
from .serializers import (
    BodySerializer,
    BranchSerializer,
    IncumbentSerializer,
    MemberSerializer,
    OrganizationalUnitSerializer,
    OrganizationSerializer,
    PositionSerializer,
)


class OrganizationViewSet(viewsets.ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer


class OrganizationalUnitViewSet(viewsets.ModelViewSet):
    queryset = OrganizationalUnit.objects.all()
    serializer_class = OrganizationalUnitSerializer


class BranchViewSet(viewsets.ModelViewSet):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer


class PositionViewSet(viewsets.ModelViewSet):
    queryset = Position.objects.all()
    serializer_class = PositionSerializer


class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer


class BodyViewSet(viewsets.ModelViewSet):
    queryset = Body.objects.all()
    serializer_class = BodySerializer


class IncumbentViewSet(viewsets.ModelViewSet):
    queryset = Incumbent.objects.all()
    serializer_class = IncumbentSerializer
