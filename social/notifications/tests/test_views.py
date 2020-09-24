from django.shortcuts import reverse

from rest_framework import status
from rest_framework.test import APITestCase

# from social.testing import create_user


class UnreadNotificationCountViewTestCase(APITestCase):
    url = reverse('notifications:unread_count')

    def test_unauthorized_status_code(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
