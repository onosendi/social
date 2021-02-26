from rest_framework import status
from rest_framework.test import APITestCase

from django.shortcuts import reverse

from posts.models import Post
from social.testing import create_user


class NotificationMixin:
    def setUp(self):
        self.user1, _ = create_user()
        self.user2, _ = create_user()

    def create_notification(self):
        post_url = reverse("posts:post")

        # `user1` creates a post.
        self.client.force_authenticate(user=self.user1)
        post_data = {
            "body": "testing",
            "is_reply": False,
        }
        self.client.post(post_url, post_data)

        # `user2` replies to `user1`'s post.
        self.client.force_authenticate(user=self.user2)
        p = Post.objects.get(body="testing")
        reply_data = {
            "body": "testing",
            "is_reply": True,
            "parent_id": p.id,
        }
        self.client.post(post_url, reply_data)

        self.client.force_authenticate(user=self.user1)


class UnreadNotificationCountViewTestCase(NotificationMixin, APITestCase):
    url = reverse("notifications:unread_count")

    def test_unauthorized_status_code(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_unread_notification_count(self):
        self.create_notification()

        response = self.client.get(self.url)

        # Test status code.
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Test notification count.
        self.assertEqual(response.data, 1)


class NoticationsViewTestCase(NotificationMixin, APITestCase):
    url = reverse("notifications:notifications")

    def test_unauthorized_status_code(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_notifications(self):
        self.create_notification()
        response = self.client.get(self.url)

        # Test status code.
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Test notification count.
        notification_count = len(response.data.get("results"))
        self.assertEqual(notification_count, 1)


class RemoveNotificationTestCase(NotificationMixin, APITestCase):
    endpoint = "notifications:remove_notification"

    def test_unauthorized_status_code(self):
        url = reverse(self.endpoint, kwargs={"pk": 0})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_remove_notification(self):
        self.create_notification()
        notification = self.user1.notifications.first()
        url = reverse(self.endpoint, kwargs={"pk": notification.pk})
        response = self.client.delete(url)

        # Test status code.
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # Test notification count.
        notification_count = self.user1.notifications.count()
        self.assertEqual(notification_count, 0)
