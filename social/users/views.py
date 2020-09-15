from django.contrib.auth import authenticate, login, logout
from django.shortcuts import get_object_or_404

from rest_framework import (
    generics as rest_generics,
    views as rest_views,
    status,
)
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from social.views import PaginationMixin
from notifications.models import Notification
from .pagination import UserPagination
from .models import User
from .serializers import PasswordSerializer, ProfileSerializer, UserSerializer


@api_view(['post'])
def login_view(request):
    cred_login = request.data.get('login')
    cred_password = request.data.get('password')
    remember_me = request.data.get('rememberMe')
    user = authenticate(request, login=cred_login, password=cred_password)
    if user is not None:
        if not remember_me:
            # Session will expire when the user closes their browser.
            request.session.set_expiry(0)
        login(request, user)
        data = UserSerializer(user).data
        return Response(data=data, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_401_UNAUTHORIZED)


@api_view(['post'])
def logout_view(request):
    logout(request)
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['post'])
def register_view(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.create(serializer.validated_data)
        # Session will expire when the user closes their browser.
        request.session.set_expiry(0)
        login(request, user)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetailAPIView(rest_generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return get_object_or_404(User, slug=self.kwargs.get('slug'))


class EditProfileAPIView(rest_generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer

    def get_object(self):
        return self.request.user.profile


class EditUserAPIView(rest_generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class EditPasswordAPIView(rest_generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PasswordSerializer

    def update(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            new_password = serializer.validated_data.get('password')
            request.user.set_password(new_password)
            request.user.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FollowingAPIView(rest_views.APIView, PaginationMixin):
    pagination_class = UserPagination
    permission_classes = [IsAuthenticated]

    def _get_object(self, slug):
        return get_object_or_404(User, is_active=True, slug=slug)

    def delete(self, request, slug):
        user = self._get_object(slug)
        r_user = request.user
        r_user.unfollow(user)
        if r_user != user:
            Notification.objects.filter(
                from_user=r_user,
                to_user=user,
                type=4,
            ).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get(self, request, slug):
        user = self._get_object(slug)
        following = user.get_following()
        paginated = self.paginator.paginate_queryset(following, self.request)
        serializer = UserSerializer(paginated, many=True)
        return self.paginator.get_paginated_response(serializer.data)

    def post(self, request, slug):
        user = self._get_object(slug)
        r_user = request.user
        r_user.follow(user)
        if r_user != user:
            Notification.objects.create(
                from_user=r_user,
                to_user=user,
                type=4,
            )
        return Response(status=status.HTTP_201_CREATED)


class FollowersAPIView(rest_generics.ListAPIView):
    pagination_class = UserPagination
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_queryset(self):
        user = get_object_or_404(User, is_active=True,
                                 slug=self.kwargs.get('slug'))
        return user.get_followers()


class RecommendedUsersAPIView(rest_generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.recommend_users(self.request.user)


class LongRecommendedUsersAPIView(rest_generics.ListAPIView):
    pagination_class = UserPagination
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.recommend_users(user=self.request.user, long=True)
