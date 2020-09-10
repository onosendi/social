from rest_framework.pagination import CursorPagination


class SearchPagination(CursorPagination):
    ordering = '-created_at'
    page_size = 10
