from django.db import models

from core.models import SoftDeleteMixin, TimestampMixin
from .managers import PostManager


class Post(SoftDeleteMixin, TimestampMixin):
    author = models.ForeignKey('users.User', related_name='posts',
                               on_delete=models.CASCADE)
    body = models.TextField(max_length=1500, blank=True)
    is_reply = models.BooleanField(default=False)
    liked = models.ManyToManyField('users.User', blank=True,
                                   related_name='liked')
    parent = models.ForeignKey('self', blank=True, null=True,
                               on_delete=models.CASCADE,
                               related_name='alt')

    objects = PostManager.as_manager()

    def __str__(self):
        ellipsis = '...' if len(self.body) > 100 else ''
        return f'{self.body[:100]}{ellipsis}'

    def get_replies(self):
        return self.alt\
            .filter(is_active=True, is_reply=True)\
            .order_by('created_at')

    def get_reposts(self):
        return self.alt\
            .filter(is_active=True, is_reply=False)\
            .order_by('created_at')
