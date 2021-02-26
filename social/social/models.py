from django.db import models


class TimestampMixin(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True
        ordering = ["-created_at"]


class SoftDeleteMixin(models.Model):
    is_active = models.BooleanField(default=True)

    class Meta:
        abstract = True
