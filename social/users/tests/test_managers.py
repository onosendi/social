from django.contrib.auth import get_user_model
from django.test import TestCase

User = get_user_model()


class UserQuerySetTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        def create_user(username):
            return User.objects.create_user(
                username=username,
                email=f"{username}@testing.com",
                password="testing",
            )

        cls.jim = create_user("jim")
        cls.lucy = create_user("lucy")
        cls.john = create_user("john")

    def test_active(self):
        """Check that only active records (have not been soft deleted) are
        returned.

        Three users are created. Soft delete one record, which should leave two
        records remaining.
        """
        self.lucy.is_active = False
        self.lucy.save()
        active_users = User.objects.active()
        self.assertEqual(active_users.count(), 2)

    def test_recommend_users(self):
        """Check that recommended users are only users that jim is not already
        following.

        Three users are created. jim follows lucy, therefore the only user left
        to recommend is john.
        """
        self.jim.follow(self.lucy)
        recommended_users = User.objects.recommend_users(self.jim)
        self.assertEqual(recommended_users.count(), 1)


class UserManagerTestCase(TestCase):
    def test_create_user_without_username(self):
        """Check that `ValueError` is raised if no username is given. Users
        must have a username."""
        with self.assertRaises(ValueError):
            User.objects.create_user(username=None, email="jim@testing.com")

    def test_create_user_without_email(self):
        """Check that `ValueError` is raised if no email is given. Users must
        have an email."""
        with self.assertRaises(ValueError):
            User.objects.create_user(username="jim", email=None)
