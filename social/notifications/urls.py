from django.urls import path

from . import views

app_name = "notifications"

urlpatterns = [
    path("", views.NotificationsAPIView.as_view(), name="notifications"),
    path("<int:pk>/", views.remove_notification_view, name="remove_notification"),
    path("unread-count/", views.unread_notification_count_view, name="unread_count"),
]
