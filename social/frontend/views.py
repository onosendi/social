import simplejson as json

from django.shortcuts import render

from users.serializers import UserSerializer


def app_view(request, *args):
    """Entry point for React application.

    The user's serializer is converted to JSON and passed to the template for
    Redux to load into its store. This avoids another request from the frontend
    to retrieve the user's data.
    """
    user_data = {}
    # Make sure `request` has the attribute `user` - this was only necessary
    # for testing.
    if hasattr(request, "user") and request.user.is_authenticated:
        serializer = UserSerializer(request.user).data
        user_data = json.dumps(serializer)
    return render(request, "frontend/index.html", {"user_data": user_data})
