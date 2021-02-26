from rest_framework import status
from rest_framework.test import APITestCase

from django.shortcuts import reverse

from social.testing import create_user


class SearchViewTestCase(APITestCase):
    url = reverse("search:search")

    def test_unauthorized_status_code(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_search(self):
        u1, _ = create_user("Jon")
        create_user("Ron")
        self.client.force_authenticate(user=u1)

        response = self.client.get(f"{self.url}?search=on")

        # Test status code
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Make sure the right results are returned.
        results_count = len(response.data.get("results"))
        self.assertEqual(results_count, 2)
