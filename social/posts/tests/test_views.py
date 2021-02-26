from rest_framework import status
from rest_framework.test import APITestCase

from django.db.models import Q
from django.shortcuts import reverse

from social.testing import create_post, create_user


class Mixin:
    @classmethod
    def setUpTestData(cls):
        cls.user1, _ = create_user()
        cls.user2, _ = create_user()
        cls.user3, _ = create_user()

    def authenticate(self):
        self.client.force_authenticate(user=self.user1)


class BadPKMixin:
    endpoint = None

    def test_pk_does_not_exist(self):
        self.authenticate()
        url = reverse(self.endpoint, kwargs={"pk": 0})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class BadSlugMixin:
    endpoint = None

    def test_slug_does_not_exist(self):
        self.authenticate()
        url = reverse(self.endpoint, kwargs={"slug": "bad-slug"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class FeedViewTestCase(Mixin, APITestCase):
    url = reverse("posts:feed")

    def test_unauthorized_status_code(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_feed(self):
        self.authenticate()
        create_post(self.user1)
        create_post(self.user2)
        create_post(self.user3)
        self.user1.follow(self.user2)

        response = self.client.get(self.url)

        # Test status code.
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Make sure the response data is paginated.
        self.assertIsInstance(response.data.get("results"), list)

        # Make sure the correct results are returned.
        results_count = len(response.data.get("results"))
        self.assertEqual(results_count, 2)


class ProfilePostsViewTestCase(Mixin, BadSlugMixin, APITestCase):
    endpoint = "posts:profile_posts"

    def test_unauthorized_status_code(self):
        url = reverse(self.endpoint, kwargs={"slug": self.user1.slug})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_profile_posts(self):
        self.authenticate()
        create_post(self.user1)
        create_post(self.user2)
        url = reverse(self.endpoint, kwargs={"slug": self.user1.slug})
        response = self.client.get(url)

        # Test status code.
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Make sure the respnose data is paginated.
        self.assertIsInstance(response.data.get("results"), list)

        # Make sure the correct results are returned.
        results_count = len(response.data.get("results"))
        self.assertEqual(results_count, 1)


class ProfileLikesViewTestCase(Mixin, BadSlugMixin, APITestCase):
    endpoint = "posts:profile_likes"

    def test_unauthorized_status_code(self):
        url = reverse(self.endpoint, kwargs={"slug": self.user1.slug})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_profile_likes(self):
        self.authenticate()
        url = reverse(self.endpoint, kwargs={"slug": self.user1.slug})
        response = self.client.get(url)

        # Test status code.
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Make sure the respnose data is paginated.
        self.assertIsInstance(response.data.get("results"), list)

        # Make sure the correct results are returned.
        p = create_post(self.user1)
        p.liked.add(self.user1)
        post_likes_count = p.liked.count()
        self.assertEqual(post_likes_count, 1)


class PostViewTestCase(Mixin, APITestCase):
    url = reverse("posts:post")

    def test_unauthorized_status_code(self):
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_post(self):
        self.authenticate()
        data = {
            "body": "testing",
            "is_reply": False,
        }
        response = self.client.post(self.url, data)

        # Test status code.
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Make sure the post was created.
        post_count = self.user1.posts.filter(Q(parent_id=None), is_reply=False).count()
        self.assertEqual(post_count, 1)

    def test_create_reply(self):
        self.authenticate()
        p = create_post(self.user2)
        data = {
            "body": "testing",
            "is_reply": True,
            "parent_id": p.id,
        }
        response = self.client.post(self.url, data)

        # Test status code.
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Make sure the reply was created.
        post_count = self.user1.posts.filter(~Q(parent_id=None), is_reply=True).count()
        self.assertEqual(post_count, 1)

        # Make sure user2 gets notified of a repost.
        notifications_count = self.user2.notifications.count()
        self.assertEqual(notifications_count, 1)


class RepostViewTestCase(Mixin, APITestCase):
    url = reverse("posts:repost")

    def test_unauthorized_status_code(self):
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_repost(self):
        self.authenticate()
        p = create_post(self.user2)
        data = {
            "body": "testing",
            "is_reply": False,
            "parent_id": p.id,
        }
        response = self.client.post(self.url, data)

        # Test status code.
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Make sure the repost was created.
        repost_count = p.alt.filter(~Q(parent_id=None), is_reply=False).count()
        self.assertEqual(repost_count, 1)

        # Make sure user2 gets notified of a repost.
        notifications_count = self.user2.notifications.count()
        self.assertEqual(notifications_count, 1)


class PostDetailViewTestCase(Mixin, BadPKMixin, APITestCase):
    endpoint = "posts:post_detail"

    def test_unauthorized_status_code(self):
        url = reverse(self.endpoint, kwargs={"pk": 1})
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_post_detail(self):
        self.authenticate()
        p = create_post(self.user1)
        url = reverse(self.endpoint, kwargs={"pk": p.pk})
        response = self.client.get(url)

        # Test status code.
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_must_be_owner(self):
        self.authenticate()
        p = create_post(self.user2)
        url = reverse(self.endpoint, kwargs={"pk": p.pk})
        data = {"body": "testing"}
        response = self.client.patch(url, data)

        # Test status code.
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_post_detail(self):
        self.authenticate()
        p = create_post(self.user1)
        url = reverse(self.endpoint, kwargs={"pk": p.pk})
        new_body = "testing"
        data = {
            "body": new_body,
        }
        response = self.client.patch(url, data)

        # Test status code.
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Make sure post was updated.
        updated_body = self.user1.posts.get(pk=p.pk).body
        self.assertEqual(updated_body, new_body)

    def test_delete_post_detail(self):
        self.authenticate()
        p = create_post(self.user1)
        url = reverse(self.endpoint, kwargs={"pk": p.pk})
        response = self.client.delete(url)

        # Test status code.
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # Make sure the post was deleted.
        post_count = self.user1.posts.active().count()
        self.assertEqual(post_count, 0)


class LikesViewTestCase(Mixin, BadPKMixin, APITestCase):
    endpoint = "posts:likes"

    def test_unauthorized_status_code(self):
        url = reverse(self.endpoint, kwargs={"pk": 1})
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_likes(self):
        self.authenticate()
        p = create_post(self.user1)
        p.liked.add(self.user1)
        url = reverse(self.endpoint, kwargs={"pk": p.pk})
        response = self.client.get(url)

        # Test status code.
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Make sure the response data is paginated.
        self.assertIsInstance(response.data.get("results"), list)

        # Make sure the results are correct.
        likes_count = p.liked.count()
        self.assertEqual(likes_count, 1)

    def test_add_like(self):
        self.authenticate()
        p = create_post(self.user1)
        url = reverse(self.endpoint, kwargs={"pk": p.pk})
        response = self.client.post(url)

        # Test status code.
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Make sure the like was created.
        likes_count = p.liked.count()
        self.assertEqual(likes_count, 1)

    def test_delete_like(self):
        self.authenticate()
        p = create_post(self.user1)
        url = reverse(self.endpoint, kwargs={"pk": p.pk})
        response = self.client.delete(url)

        # Test status code.
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # Make sure the like was deleted.
        likes_count = p.liked.count()
        self.assertEqual(likes_count, 0)


class RecommendPostsViewTestCase(Mixin, APITestCase):
    url = reverse("posts:recommended_posts")

    def test_unauthorized_status_code(self):
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_recommended_posts(self):
        self.authenticate()
        create_post(self.user2)
        response = self.client.get(self.url)

        # Test status code.
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Make sure the correct results are returned.
        recommended_post_username = response.data[0].get("author").get("username")
        self.assertEqual(recommended_post_username, self.user2.username)


class LongRecommendedPostsViewTestCase(Mixin, APITestCase):
    url = reverse("posts:long_recommended_posts")

    def test_unauthorized_status_code(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_long_recommended_posts(self):
        self.authenticate()
        create_post(self.user2)
        response = self.client.get(self.url)

        # Test status code.
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Make sure the response data is paginated.
        self.assertIsInstance(response.data.get("results"), list)

        # Make sure the correct results are returned.
        recommended_post_username = (
            response.data.get("results")[0].get("author").get("username")
        )
        self.assertEqual(recommended_post_username, self.user2.username)


class PostRepliesTestCase(Mixin, BadPKMixin, APITestCase):
    endpoint = "posts:replies"

    def test_unauthorized_status_code(self):
        url = reverse(self.endpoint, kwargs={"pk": 1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_post_replies(self):
        self.authenticate()
        p = create_post(self.user1)
        create_post(self.user1, is_reply=True, parent=p)
        url = reverse(self.endpoint, kwargs={"pk": p.pk})
        response = self.client.get(url)

        # Test status code.
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Make sure the response data is paginated.
        self.assertIsInstance(response.data.get("results"), list)

        # Make sure the correct results are returned.
        reply_count = p.get_replies().count()
        self.assertEqual(reply_count, 1)
