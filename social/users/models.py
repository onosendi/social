from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.postgres.fields.citext import CICharField, CIEmailField
from django.db import models
from django.utils.text import slugify
from django.utils.timezone import now

from social.models import SoftDeleteMixin, TimestampMixin
from .managers import UserManager


class User(SoftDeleteMixin, TimestampMixin, AbstractBaseUser):
    """ Custom user model. """

    email = CIEmailField(
        max_length=255,
        unique=True,
    )
    fake_account = models.BooleanField(default=False)
    following = models.ManyToManyField(
        "self",
        related_name="followers",
        symmetrical=False,
    )
    last_notification_read_time = models.DateTimeField(default=now)
    name = models.CharField(max_length=150)
    slug = models.SlugField(
        max_length=32,
        unique=True,
    )
    username = CICharField(
        max_length=32,
        unique=True,
    )

    objects = UserManager()

    USERNAME_FIELD = "username"
    EMAIL_FIELD = "email"

    def display_name(self) -> str:
        """Get user's display name.

        When this project was started, `name` was not a required field. This
        method would return the user's username if `name` was not set. Instead
        of changing this throughout the frontend I left it as is.
        """
        return self.name

    def follow(self, user: object) -> None:
        """ Follow `user`. """
        if user != self:
            self.following.add(user)

    def get_followers(self):
        """ Get users that are following user. """
        return (
            self.followers.filter(is_active=True)
            .select_related("profile")
            .prefetch_related("followers")
            .prefetch_related("following")
        )

    def get_following(self):
        """ Get users that user is following. """
        return (
            self.following.filter(is_active=True)
            .select_related("profile")
            .prefetch_related("followers")
            .prefetch_related("following")
        )

    def save(self, *args, **kwargs):
        """Modify user input.

        - Make sure the user's email is all lowercase.
        - Create a slug for the user.
        """
        self.email = self.email.lower()
        self.slug = slugify(self.username, allow_unicode=True)
        super().save(*args, **kwargs)

    def unfollow(self, user: object) -> None:
        """ Unfollow `user`. """
        self.following.remove(user)


class Profile(models.Model):
    class SexTypes(models.TextChoices):
        MALE = "M"
        FEMALE = "F"

    banner = models.ImageField(upload_to="images/%Y/%m/%d/", blank=True)
    bio = models.TextField(max_length=500, blank=True)
    image = models.ImageField(upload_to="images/%Y/%m/%d/", blank=True)
    location = models.CharField(max_length=100, blank=True)
    sex = models.CharField(
        blank=True,
        max_length=1,
        choices=SexTypes.choices,
    )
    user = models.OneToOneField("users.User", on_delete=models.CASCADE)
    website = models.URLField(blank=True)

    def __str__(self):
        return self.user.username
