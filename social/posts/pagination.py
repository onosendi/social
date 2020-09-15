from rest_framework.pagination import CursorPagination


class PostPagination(CursorPagination):
    ordering = '-created_at'
    page_size = 10


class ReplyPagination(CursorPagination):
    ordering = '-created_at'
    page_size = 10


class ProfileLikesPagination(CursorPagination):
    ordering = 'created_at'
    page_size = 10
