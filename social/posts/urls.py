from django.urls import path

from . import views

app_name = "posts"

urlpatterns = [
    path("", views.PostAPIView.as_view(), name="post"),
    path("repost/", views.RepostAPIView.as_view(), name="repost"),
    path("<int:pk>/", views.PostDetailAPIView.as_view(), name="post_detail"),
    path("<int:pk>/likes/", views.LikesAPIView.as_view(), name="likes"),
    path("<int:pk>/replies/", views.PostRepliesAPIView.as_view(), name="replies"),
    path("feed/", views.FeedAPIView.as_view(), name="feed"),
    path(
        "profile/<str:slug>/likes/",
        views.ProfileLikesAPIView.as_view(),
        name="profile_likes",
    ),
    path(
        "profile/<str:slug>/posts/",
        views.ProfilePostsAPIView.as_view(),
        name="profile_posts",
    ),
    path(
        "long-recommended-posts/",
        views.LongRecommendedPostsAPIView.as_view(),
        name="long_recommended_posts",
    ),
    path(
        "recommended-posts/",
        views.RecommendedPostsAPIView.as_view(),
        name="recommended_posts",
    ),
]
