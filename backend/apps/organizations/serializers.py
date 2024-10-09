from rest_framework import serializers

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


class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = "__all__"


class OrganizationalUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizationalUnit
        fields = "__all__"


class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = "__all__"


class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = "__all__"


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = "__all__"


class BodySerializer(serializers.ModelSerializer):
    class Meta:
        model = Body
        fields = "__all__"


class TermSerializer(serializers.ModelSerializer):
    class Meta:
        model = Term
        fields = "__all__"


class IncumbentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Incumbent
        fields = "__all__"
