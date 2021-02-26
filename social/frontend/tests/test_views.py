from rest_framework import status

from django.urls import reverse


def test_app_status_code(api_client):
    url = reverse("frontend:app")
    response = api_client.get(url)
    assert response.status_code == status.HTTP_200_OK


def test_app_auth_user_has_context_data(api_client, auth_user):
    url = reverse("frontend:app")
    response = api_client.get(url)
    user_context_data = response.context.get("user_data")
    assert auth_user.email in user_context_data
