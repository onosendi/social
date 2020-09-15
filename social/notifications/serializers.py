from rest_framework import serializers

from .models import Notification
from posts.serializers import PostSerializer
from users.serializers import UserSerializer


class NotificationSerializer(serializers.ModelSerializer):
    from_user = UserSerializer()
    post = PostSerializer()
    to_user = UserSerializer()

    class Meta:
        model = Notification
        fields = [
            'created_at',
            'from_user',
            'id',
            'post',
            'to_user',
            'type',
        ]
