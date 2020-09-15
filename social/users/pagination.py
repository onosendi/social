from rest_framework.pagination import CursorPagination


class UserPagination(CursorPagination):
    ordering = '-created_at'
    page_size = 10
