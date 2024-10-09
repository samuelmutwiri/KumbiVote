from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    BallotViewSet,
    CandidateViewSet,
    ElectionViewSet,
    PollViewSet,
    ResultViewSet,
)

router = DefaultRouter()
router.register(r"elections", ElectionViewSet)
router.register(r"polls", PollViewSet)
router.register(r"candidates", CandidateViewSet)
router.register(r"ballots", BallotViewSet)
router.register(r"ballots", ResultViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
