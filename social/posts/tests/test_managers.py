from django.test import TestCase

from social.testing import create_post, create_user
from ..models import Post


class PostManagerTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user1, _ = create_user()
        cls.user2, _ = create_user()
        cls.user3, _ = create_user()

    def test_active(self):
        """ Posts are soft deleted, so only get active posts. """
        create_post(self.user1)
        p2 = create_post(self.user1)
        p2.is_active = False
        p2.save()
        active_posts = Post.objects.active()
        self.assertEqual(active_posts.count(), 1)

    def test_feed(self):
        """Feed consists of a user's posts, and posts that user is following.
        Here user1, user2, and user3 create a post. user1 follows user2,
        therefore the feed should only consist of 2 posts."""
        create_post(self.user1)
        create_post(self.user2)
        create_post(self.user3)
        self.user1.follow(self.user2)
        feed_count = Post.objects.feed(self.user1).count()
        self.assertEqual(feed_count, 2)

    def test_posts(self):
        p1 = create_post(self.user1)
        create_post(self.user1, is_reply=True, parent=p1)

        p2 = create_post(self.user1)
        p2.is_active = False
        p2.save()

        posts = Post.objects.posts().filter(author=self.user1)

        # Check post count
        post_count = posts.count()
        self.assertEqual(post_count, 1)

        # Check reply count
        reply_count = len(posts[0].reply_ids)
        self.assertEqual(reply_count, 1)

        # Check repost count
        create_post(self.user1, parent=p1)
        repost_count = len(posts[0].repost_ids)
        self.assertEqual(repost_count, 1)

    def test_profile_posts(self):
        create_post(self.user1)

        p2 = create_post(self.user1)
        p2.is_active = False
        p2.save()

        create_post(self.user2)

        profile_post_count = Post.objects.profile_posts(self.user1).count()
        self.assertEqual(profile_post_count, 1)

    def test_recommend_posts(self):
        p1 = create_post(self.user2)
        create_post(self.user3, parent=p1)
        create_post(self.user3)
        self.user1.follow(self.user2)
        recommend_post_count = Post.objects.recommend_posts(self.user1).count()
        self.assertEqual(recommend_post_count, 1)

        for _ in range(0, 10):
            create_post(self.user3)

        recommend_post_count = Post.objects.recommend_posts(self.user1).count()
        self.assertEqual(recommend_post_count, 5)

        recommend_post_count = Post.objects.recommend_posts(
            self.user1, long=True
        ).count()
        self.assertEqual(recommend_post_count, 11)
