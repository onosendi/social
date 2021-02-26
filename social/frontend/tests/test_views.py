import simplejson as json

from django.test import TestCase

from social.testing import create_user


class AppViewTestCase(TestCase):
    def test_app_view(self):
        user, password = create_user()
        self.client.force_login(user)
        response = self.client.get("/")

        # Test status code.
        self.assertEqual(response.status_code, 200)

        # Make sure `context.user_data` is set.
        user_data_username = json.loads(response.context.get("user_data")).get(
            "username"
        )
        self.assertEqual(user_data_username, user.username)
