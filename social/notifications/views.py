from rest_framework import generics as rest_generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from django.shortcuts import get_object_or_404
from django.utils.timezone import now

from .models import Notification
from .pagination import NotificationPagination
from .serializers import NotificationSerializer


@api_view()
@permission_classes([IsAuthenticated])
def unread_notification_count_view(request):
    """Return user's notification count.

    This view is used for polling for the notification badge. Consider sockets
    instead."""
    r_user = request.user
    count = Notification.objects.filter(
        to_user=r_user,
        created_at__gt=r_user.last_notification_read_time,
    ).count()
    return Response(count, status=status.HTTP_200_OK)


class NotificationsAPIView(rest_generics.ListAPIView):
    pagination_class = NotificationPagination
    permission_classes = [IsAuthenticated]
    serializer_class = NotificationSerializer

    def get_queryset(self):
        r_user = self.request.user
        r_user.last_notification_read_time = now()
        r_user.save()
        return Notification.objects.filter(to_user=self.request.user)


@api_view(["delete"])
@permission_classes([IsAuthenticated])
def remove_notification_view(request, pk):
    n = get_object_or_404(Notification, pk=pk, to_user=request.user)
    n.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
