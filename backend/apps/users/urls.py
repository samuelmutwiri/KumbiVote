from django.urls import include, path

from apps.users import views

# from .views import UserProfileViewSet, UserViewSet

# router = DefaultRouter()
# router.register(r"users", UserViewSet)
# router.register(r"profile", UserProfileViewSet)

urlpatterns = [
    path("login", views.login_view, name="login"),
    path("profile/", views.profile_view, name="profile"),
    path("register/", views.register_view, name="register"),
    path("logout", views.logout_view, name="logout"),
    path("", include(router.urls)),
]
