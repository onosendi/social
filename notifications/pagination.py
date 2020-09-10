from rest_framework.pagination import CursorPagination


class NotificationPagination(CursorPagination):
    ordering = '-created_at'
    page_size = 10
