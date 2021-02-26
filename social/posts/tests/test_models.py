from django.test import TestCase

from social.testing import create_post, create_user


class PostModelTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user1, _ = create_user()

    def test_string_representation(self):
        p = create_post(self.user1, body="testing")
        self.assertEqual(str(p), "testing")

    def test_get_replies(self):
        p = create_post(self.user1)
        create_post(self.user1, is_reply=True, parent=p)

        r2 = create_post(self.user1, is_reply=True, parent=p)
        r2.is_active = False
        r2.save()

        reply_count = p.get_replies().count()
        self.assertEqual(reply_count, 1)

    def test_get_reposts(self):
        p = create_post(self.user1)
        create_post(self.user1, is_reply=True, parent=p)
        create_post(self.user1, is_reply=False, parent=p)

        rp2 = create_post(self.user1, is_reply=False, parent=p)
        rp2.is_active = False
        rp2.save()

        repost_count = p.get_reposts().count()
        self.assertEqual(repost_count, 1)
