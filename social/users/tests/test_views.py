from rest_framework import status
from rest_framework.test import APITestCase

from django.contrib.auth import authenticate, get_user_model
from django.shortcuts import reverse

from social.testing import create_user

User = get_user_model()


class Mixin:
    @classmethod
    def setUp(cls):
        cls.user1, cls.user1_password = create_user()
        cls.user2, _ = create_user()

    def authenticate(self):
        self.client.force_authenticate(user=self.user1)


class LoginViewTestCase(APITestCase):
    url = reverse("users:login")

    def test_login_with_username_success_status_code(self):
        user, password = create_user()
        credentials = {
            "login": user.username,
            "password": password,
        }
        response = self.client.post(self.url, credentials)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_with_email_success_status_code(self):
        user, password = create_user()
        credentials = {
            "login": user.email,
            "password": password,
        }
        response = self.client.post(self.url, credentials)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_failure_status_code(self):
        credentials = {
            "login": "wrong@email.com",
            "password": "wrong-password",
        }
        response = self.client.post(self.url, credentials)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class LogoutViewTestCase(APITestCase):
    url = reverse("users:logout")

    def test_logout_status_code(self):
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class RegisterViewTestCase(APITestCase):
    url = reverse("users:register")

    def test_register_success(self):
        data = {
            "email": "jim@testing.com",
            "name": "Jim Fowler",
            "password": "testing",
            "password2": "testing",
            "username": "jim",
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Make sure the user was created.
        self.assertEqual(User.objects.count(), 1)


class UserDetailViewTestCase(Mixin, APITestCase):
    def test_unauthorized_status_code(self):
        url = reverse("users:user_detail", kwargs={"slug": self.user1.slug})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_authorized_status_code(self):
        self.authenticate()
        url = reverse("users:user_detail", kwargs={"slug": self.user1.slug})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_slug_does_not_exist(self):
        self.authenticate()
        url = reverse("users:user_detail", kwargs={"slug": "bad-slug"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class EditProfileViewTestCase(Mixin, APITestCase):
    url = reverse("users:edit_profile")

    def test_unauthorized_status_code(self):
        response = self.client.patch(self.url, {"website": "testing.com"})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_edit_profile(self):
        self.authenticate()
        response = self.client.patch(self.url, {"bio": "testing"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Make sure profile was updated.
        self.assertEqual(self.user1.profile.bio, "testing")


class EditUserViewTestCase(Mixin, APITestCase):
    url = reverse("users:edit_user")

    def test_unauthorized_status_code(self):
        response = self.client.patch(self.url, {"name": self.user1.name})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_authorized_status_code(self):
        self.authenticate()
        response = self.client.patch(self.url, {"name": "new-name"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Make sure user's name was updated.
        self.assertEqual(self.user1.name, "new-name")


class EditPasswordViewTestCase(Mixin, APITestCase):
    url = reverse("users:edit_password")

    def test_unauthorized_status_code(self):
        response = self.client.put(self.url, {"password": "some-password"})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_edit_password(self):
        self.authenticate()
        new_password = "new-password"
        data = {
            "current_password": self.user1_password,
            "password": new_password,
            "password2": new_password,
        }
        response = self.client.put(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Make sure new credentials work.
        auth = authenticate(login=self.user1.username, password=new_password)
        self.assertIsNotNone(auth)


class FollowingViewTestCase(Mixin, APITestCase):
    def test_unauthorized_status_code(self):
        url = reverse("users:following", kwargs={"slug": self.user1.slug})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_slug_does_not_exist(self):
        self.authenticate()
        url = reverse("users:following", kwargs={"slug": "bad-slug"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_following(self):
        self.authenticate()
        url = reverse("users:following", kwargs={"slug": self.user1.slug})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Make sure the response data is paginated.
        self.assertIsInstance(response.data.get("results"), list)

    def test_follow(self):
        self.authenticate()
        url = reverse("users:following", kwargs={"slug": self.user2.slug})
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Make sure user1 is following user2.
        following_count = self.user1.following.count()
        self.assertEqual(following_count, 1)

        # Make sure user2 is notified.
        notification_count = self.user2.notifications.count()
        self.assertEqual(notification_count, 1)

    def test_unfollow(self):
        self.authenticate()
        url = reverse("users:following", kwargs={"slug": self.user2.slug})

        # Follow user so a notification is created.
        self.client.post(url)

        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # Make sure user1 is no longer following user2.
        following_count = self.user1.following.count()
        self.assertEqual(following_count, 0)

        # Make sure user2's notification is removed.
        notification_count = self.user2.notifications.count()
        self.assertEqual(notification_count, 0)


class FollowersViewTestCase(Mixin, APITestCase):
    def test_unauthorized_status_code(self):
        url = reverse("users:followers", kwargs={"slug": self.user1.slug})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_followers(self):
        self.authenticate()
        url = reverse("users:followers", kwargs={"slug": self.user1.slug})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Make sure the response data is paginated.
        self.assertIsInstance(response.data.get("results"), list)

    def test_slug_does_not_exist(self):
        self.authenticate()
        url = reverse("users:followers", kwargs={"slug": "bad-slug"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class RecommendedUsersViewTestCase(Mixin, APITestCase):
    url = reverse("users:recommended_users")

    def test_unauthorized_status_code(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_recommeneded_users(self):
        self.authenticate()
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Make sure the correct results are returned.
        recommended_user = response.data[0].get("slug")
        self.assertEqual(recommended_user, self.user2.slug)


class LongRecommendedUsersViewTestCase(Mixin, APITestCase):
    url = reverse("users:long_recommended_users")

    def test_unauthorized_status_code(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_long_recommended_users(self):
        self.authenticate()
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Make sure the response data is paginated.
        self.assertIsInstance(response.data.get("results"), list)

        # Make sure the correct results are returned.
        recommended_user = response.data.get("results")[0].get("slug")
        self.assertEqual(recommended_user, self.user2.slug)
