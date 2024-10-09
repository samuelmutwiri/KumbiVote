"""
URL configuration for kumbivote project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import include, path

from apps.users.oauth2_views import TokenView  # noqa
from apps.users.oauth2_views import RevokeTokenView, UserInfoView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("o/", include("oauth2_provider.urls", namespace="oauth2_provider")),
    path("oauth2/userinfo", UserInfoView.as_view(), name="oauth2_userinfo"),
    path("oauth2/token", TokenView.as_view(), name="oauth2_token"),
    path("oauth2/revoke_token/", RevokeTokenView.as_view(), name="oauth2_revoke_token"),
]
