from django.test import TestCase

from social.testing import create_user


class Mixin:
    @classmethod
    def setUp(cls):
        cls.user1, _ = create_user()
        cls.user2, _ = create_user()


class UserModelTestCase(Mixin, TestCase):
    def test_display_name(self):
        self.assertEqual(self.user1.name, self.user1.display_name())

    def test_follow(self):
        self.user1.follow(self.user2)
        self.assertEqual(self.user1.following.count(), 1)

    def test_get_followers(self):
        self.user2.follow(self.user1)
        followers_count = self.user1.get_followers().count()
        self.assertEqual(followers_count, 1)

    def test_get_following(self):
        self.user1.follow(self.user2)
        following_count = self.user1.get_following().count()
        self.assertEqual(following_count, 1)

    def test_unfollow(self):
        self.user1.follow(self.user2)
        self.user1.unfollow(self.user2)
        self.assertEqual(self.user1.following.count(), 0)
