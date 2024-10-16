from django.urls import path

from .views import SystemView

urlpatterns = [
    path("", SystemView.as_view()),
    path(
        "log/",
        SystemView.as_view(),
        name="log_event",
    ),
]
