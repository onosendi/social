import pytest

from mixer.backend.django import mixer

from django.contrib.auth import get_user_model

User = get_user_model()


@pytest.fixture
def api_client():
    from rest_framework.test import APIClient
    return APIClient()


@pytest.fixture
def auth_user(api_client, django_user_model):
    user = mixer.blend(django_user_model)
    api_client.force_login(user)
    yield user
    api_client.logout()


@pytest.fixture
def testing_password():
    return 'testing'


@pytest.fixture
def user_with_password(django_user_model, testing_password):
    user = django_user_model.objects.create_user(
        email='auth@email.com',
        password=testing_password,
    )
    return user
