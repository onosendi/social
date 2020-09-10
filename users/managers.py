from django.contrib.auth.models import UserManager as UM
from django.db import models


class UserQuerySet(models.QuerySet):
    def active(self):
        return self.filter(is_active=True).select_related('profile')

    def recommend_users(self, user: object, long):
        qs = self\
            .active()\
            .exclude(followers=user)\
            .exclude(id=user.id)\
            .prefetch_related('following')\
            .prefetch_related('followers')\
            .order_by('?')
        if long is False:
            qs = qs[:7]
        return qs


class UserManager(UM):
    def _create_user(self, username, email, password, **extra_fields):
        if not username:
            raise ValueError('The given username must be set')
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        username = self.model.normalize_username(username)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def active(self):
        return self.get_queryset().active()

    def create_user(self, email, username, password=None, **extra_fields):
        return self._create_user(username, email, password, **extra_fields)

    def get_queryset(self):
        return UserQuerySet(self.model, using=self._db)

    def recommend_users(self, user: object, long=False):
        return self.get_queryset().recommend_users(user, long)
