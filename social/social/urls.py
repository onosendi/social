from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path

urlpatterns = [
    path("api/notifications/", include("notifications.urls")),
    path("api/posts/", include("posts.urls")),
    path("api/search/", include("search.urls")),
    path("api/users/", include("users.urls")),
    path("", include("frontend.urls")),
]

if settings.DEBUG is True:
    import debug_toolbar

    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns = [
        path("__debug__/", include(debug_toolbar.urls)),
    ] + urlpatterns
