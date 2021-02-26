from rest_framework import generics as rest_generics, status, views as rest_views
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from notifications.models import Notification
from social.permissions import IsOwnerOrReadOnly
from social.views import PaginationMixin
from users.serializers import UserSerializer
from .models import Post
from .pagination import PostPagination, ProfileLikesPagination, ReplyPagination
from .serializers import (
    PostDetailSerializer,
    PostSerializer,
    ReplySerializer,
    RepostSerializer,
)

User = get_user_model()


class FeedAPIView(rest_generics.ListAPIView):
    """ Get the user's posts, and the posts of the users they're following. """

    pagination_class = PostPagination
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.feed(self.request.user)


class LikesAPIView(rest_views.APIView, PaginationMixin):
    pagination_class = ReplyPagination
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk: int):
        """ Remove user from post's likes. """
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
        """ Get all users from post's likes. """
        post = self.get_object(pk)
        users = post.liked.all()
        paginated = self.paginator.paginate_queryset(users, self.request)
        serializer = UserSerializer(paginated, many=True)
        return self.paginator.get_paginated_response(serializer.data)

    def get_object(self, pk: int) -> Post:
        return get_object_or_404(Post, pk=pk, is_active=True)

    def post(self, request, pk):
        """ Add user to post's likes. """
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


class LongRecommendedPostsAPIView(rest_generics.ListAPIView):
    """Get paginated recommended posts for the recommended posts page.

    Recommended posts are posts of users that the user is not following.
    """

    pagination_class = PostPagination
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.recommend_posts(user=self.request.user, long=True)


class PostAPIView(rest_generics.CreateAPIView):
    """Create post or reply.

    A repost has a separate view. See :class:`RepostAPIView`.

    See :mod:`posts.models` :class:`Post` for more info.
    """

    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        parent_post_id = self.request.data.get("parent_id")

        # Create notification.
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


class PostDetailAPIView(rest_generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    serializer_class = PostDetailSerializer

    def delete(self, request, pk):
        """ Remove post. """
        r_user = self.request.user
        post = get_object_or_404(Post, author=r_user, pk=pk, is_active=True)
        post.is_active = False
        post.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_queryset(self):
        return Post.objects.filter(pk=self.kwargs.get("pk")).active()


class PostRepliesAPIView(rest_generics.ListAPIView):
    """ Get paginated replies for a post. """

    pagination_class = ReplyPagination
    permission_classes = [IsAuthenticated]
    serializer_class = ReplySerializer

    def get_queryset(self):
        pk = self.kwargs.get("pk")
        post = get_object_or_404(Post, pk=pk, is_active=True)
        return post.get_replies()


class ProfileLikesAPIView(rest_generics.ListAPIView):
    """ Get paginated posts the user has liked. """

    pagination_class = ProfileLikesPagination
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def get_queryset(self):
        slug = self.kwargs.get("slug")
        user = get_object_or_404(User, is_active=True, slug=slug)
        return Post.objects.posts().filter(liked=user)


class ProfilePostsAPIView(rest_generics.ListAPIView):
    """ Get the user's posts only. """

    pagination_class = PostPagination
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def get_queryset(self):
        slug = self.kwargs.get("slug")
        user = get_object_or_404(User, is_active=True, slug=slug)
        return Post.objects.profile_posts(user)


class RepostAPIView(rest_generics.CreateAPIView):
    """Repost a post.

    See :mod:`posts.models` :class:`Post` for more info.
    """

    permission_classes = [IsAuthenticated]
    serializer_class = RepostSerializer

    def perform_create(self, serializer):
        parent_post_id = self.request.data.get("parent_id")
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


class RecommendedPostsAPIView(rest_generics.ListAPIView):
    """Get recommended posts for the aside column.

    Recommended posts are posts of users that the user is not following.
    """

    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.objects.recommend_posts(user=self.request.user)
