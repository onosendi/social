from django.db import models

from core.models import SoftDeleteMixin, TimestampMixin


class Notification(SoftDeleteMixin, TimestampMixin):
    NOTIFICATION_TYPES = [
        (1, 'repost'),
        (2, 'like_post'),
        (3, 'reply'),
        (4, 'follow'),
    ]
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    from_user = models.ForeignKey('users.User', on_delete=models.CASCADE,
                                  related_name='notification_from_user')
    is_read = models.BooleanField(default=False)
    post = models.ForeignKey('posts.Post', blank=True, null=True,
                             on_delete=models.CASCADE,
                             related_name='notification_post')
    to_user = models.ForeignKey('users.User', on_delete=models.CASCADE,
                                related_name='notifications')
    type = models.PositiveIntegerField(choices=NOTIFICATION_TYPES)

    def __str__(self):
        return f'{self.from_user} => {self.to_user}: {self.type}'
