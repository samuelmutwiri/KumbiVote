from django.urls import path

from . import views

urlpatterns = [
    path(
        "",
        views.UserViewSet.as_view({"get": "list"}),
    ),
    path(
        "<int:pk>/",
        views.UserViewSet.as_view({"get": "retrieve"}),
    ),
    path(
        "create/",
        views.UserViewSet.as_view({"post": "create"}),
    ),
    path(
        "<int:pk>/update/",
        views.UserViewSet.as_view({"put": "update"}),
    ),
    path(
        "<int:pk>/delete/",
        views.UserViewSet.as_view({"delete": "destroy"}),
    ),
]
