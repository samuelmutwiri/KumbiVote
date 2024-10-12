from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    BodyViewSet,
    BranchViewSet,
    IncumbentViewSet,
    MemberViewSet,
    OrganizationalUnitViewSet,
    OrganizationViewSet,
    PositionViewSet,
)

router = DefaultRouter()
router.register(r"orgs", OrganizationViewSet)
router.register(r"units", OrganizationalUnitViewSet)
router.register(r"branches", BranchViewSet)
router.register(r"positions", PositionViewSet)
router.register(r"bodies", BodyViewSet)
router.register(r"incumbents", IncumbentViewSet)
router.register(r"members", MemberViewSet)

urlpatterns = [
    path("org/", include(router.urls)),
]
