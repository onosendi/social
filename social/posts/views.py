from django.shortcuts import get_object_or_404

from rest_framework import (
    generics as rest_generics,
    status,
)
from rest_framework import views as rest_views
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from social.permissions import IsOwnerOrReadOnly
from social.views import PaginationMixin
from notifications.models import Notification
from .pagination import PostPagination, ProfileLikesPagination, ReplyPagination
from .models import Post
from .serializers import (
    PostDetailSerializer,
    PostSerializer,
    RepostSerializer,
    ReplySerializer,
)
from users.models import User
from users.serializers import UserSerializer


class FeedAPIView(rest_generics.ListAPIView):
    pagination_class = PostPagination
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.feed(self.request.user)


class ProfilePostsAPIView(rest_generics.ListAPIView):
    pagination_class = PostPagination
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def get_queryset(self):
        slug = self.kwargs.get('slug')
        user = get_object_or_404(User, is_active=True, slug=slug)
        return Post.objects.profile_posts(user)


class ProfileLikesAPIView(rest_generics.ListAPIView):
    pagination_class = ProfileLikesPagination
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def get_queryset(self):
        slug = self.kwargs.get('slug')
        user = get_object_or_404(User, is_active=True, slug=slug)
        return Post.objects.posts().filter(liked=user)


class PostAPIView(rest_generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        parent_post_id = self.request.data.get('parent_id')
        if parent_post_id:
            parent_post = get_object_or_404(Post, id=parent_post_id)
            r_user = self.request.user
            if r_user != parent_post.author:
                Notification.objects.create(
                    from_user=r_user,
                    to_user=parent_post.author,
                    type=3,
                    post=parent_post,
                )
        serializer.save(author=self.request.user)


class RepostAPIView(rest_generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = RepostSerializer

    def perform_create(self, serializer):
        parent_post_id = self.request.data.get('parent_id')
        parent_post = get_object_or_404(Post, id=parent_post_id)
        r_user = self.request.user
        if r_user != parent_post.author:
            Notification.objects.create(
                from_user=r_user,
                to_user=parent_post.author,
                type=1,
                post=parent_post,
            )
        serializer.save(author=self.request.user)


class PostDetailAPIView(rest_generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    serializer_class = PostDetailSerializer

    def delete(self, request, pk):
        r_user = self.request.user
        post = get_object_or_404(Post, author=r_user, pk=pk, is_active=True)
        post.is_active = False
        post.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_queryset(self):
        return Post.objects.filter(pk=self.kwargs.get('pk')).active()


class LikesAPIView(rest_views.APIView, PaginationMixin):
    pagination_class = ReplyPagination
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        post = self.get_object(pk)
        r_user = request.user
        post.liked.remove(r_user)
        Notification.objects.filter(
            from_user=r_user,
            to_user=post.author,
            type=2,
            post=post,
        ).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get(self, request, pk):
        post = self.get_object(pk)
        users = post.liked.all()
        paginated = self.paginator.paginate_queryset(users, self.request)
        serializer = UserSerializer(paginated, many=True)
        return self.paginator.get_paginated_response(serializer.data)

    def get_object(self, pk):
        return get_object_or_404(Post, pk=pk, is_active=True)

    def post(self, request, pk):
        post = self.get_object(pk)
        r_user = request.user
        if r_user not in post.liked.all():
            post.liked.add(r_user)
            if r_user != post.author:
                Notification.objects.create(
                    from_user=r_user,
                    to_user=post.author,
                    type=2,
                    post=post,
                )
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_200_OK)


class RecommendedPostsAPIView(rest_generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.recommend_posts(user=self.request.user)


class LongRecommendedPostsAPIView(rest_generics.ListAPIView):
    pagination_class = PostPagination
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.recommend_posts(user=self.request.user, long=True)


class PostRepliesAPIView(rest_generics.ListAPIView):
    pagination_class = ReplyPagination
    permission_classes = [IsAuthenticated]
    serializer_class = ReplySerializer

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        post = get_object_or_404(Post, pk=pk, is_active=True)
        return post.get_replies()
