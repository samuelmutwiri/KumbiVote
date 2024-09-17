from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (BranchViewSet, MemberViewSet, OrganizationalUnitViewSet,
                    OrganizationViewSet, PositionViewSet)

router = DefaultRouter()
router.register(r"organizations", OrganizationViewSet)
router.register(r"units", OrganizationalUnitViewSet)
router.register(r"branches", BranchViewSet)
router.register(r"positions", PositionViewSet)
router.register(r"members", MemberViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
]
