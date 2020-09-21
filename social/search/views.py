from rest_framework import (
    filters,
    generics as rest_generics,
)
from rest_framework.permissions import IsAuthenticated

from search.pagination import SearchPagination
from users.models import User
from users.serializers import UserSerializer


class SearchAPIView(rest_generics.ListAPIView):
    filter_backends = [filters.SearchFilter]
    pagination_class = SearchPagination
    permission_classes = [IsAuthenticated]
    search_fields = ['username', 'name']
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects\
            .select_related('profile')\
            .prefetch_related('following')\
            .prefetch_related('followers')
