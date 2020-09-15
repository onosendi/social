import simplejson as json

from django.shortcuts import render

from users.serializers import UserSerializer


def app_view(request, *args):
    user_data = {}
    if hasattr(request, 'user') and request.user.is_authenticated:
        serializer = UserSerializer(request.user).data
        user_data = json.dumps(serializer)
    return render(request, 'frontend/index.html', {'user_data': user_data})
