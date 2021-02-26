from django.urls import path

from . import views

app_name = "users"

urlpatterns = [
    path("auth/login/", views.login_view, name="login"),
    path("auth/logout/", views.logout_view, name="logout"),
    path("auth/register/", views.register_view, name="register"),
    path("edit-password/", views.EditPasswordAPIView.as_view(), name="edit_password"),
    path("edit-profile/", views.EditProfileAPIView.as_view(), name="edit_profile"),
    path("edit-user/", views.EditUserAPIView.as_view(), name="edit_user"),
    path(
        "long-recommended-users/",
        views.LongRecommendedUsersAPIView.as_view(),
        name="long_recommended_users",
    ),
    path(
        "recommended-users/",
        views.RecommendedUsersAPIView.as_view(),
        name="recommended_users",
    ),
    path("<str:slug>/", views.UserDetailAPIView.as_view(), name="user_detail"),
    path("<str:slug>/following/", views.FollowingAPIView.as_view(), name="following"),
    path("<str:slug>/followers/", views.FollowersAPIView.as_view(), name="followers"),
]
