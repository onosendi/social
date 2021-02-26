from django.contrib.auth import authenticate, get_user_model
from django.test import TestCase

User = get_user_model()


class AuthenticateTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        User.objects.create_user(
            username="jim",
            email="jim@testing.com",
            password="testing",
        )

    def test_authenticate_with_no_credentials(self):
        """ Check that `None` is returned if no credentials are provided. """
        a = authenticate()
        self.assertIsNone(a)

    def test_authenticate_with_bad_credentials(self):
        """ Check that `None` is returned if bad credentials are provided. """
        a = authenticate(login="bad-username", password="bad-password")
        self.assertIsNone(a)

    def test_authenticate_with_email(self):
        """ Check that user can authenticate with their email address. """
        a = authenticate(login="jim@testing.com", password="testing")
        self.assertIsNotNone(a)

    def test_authenticate_with_username(self):
        """ Check that user can authenticate with their username. """
        a = authenticate(login="jim", password="testing")
        self.assertIsNotNone(a)

    def test_authenticate_with_email_with_caps(self):
        """Check that user can authenticate with their email address,
        disregarding case sensitivity."""
        a = authenticate(login="JIM@TESTING.COM", password="testing")
        self.assertIsNotNone(a)

    def test_authenticate_with_username_with_caps(self):
        """Check that user can authenticate with their username, disregarding
        case sensitivity."""
        a = authenticate(login="JIM", password="testing")
        self.assertIsNotNone(a)
