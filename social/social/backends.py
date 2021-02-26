from typing import Union

from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from django.db.models import Q

User = get_user_model()


class UsernameOrEmailAuth(ModelBackend):
    def authenticate(
        self,
        request,
        login: Union[str, None] = None,
        password: Union[str, None] = None,
        **kwargs,
    ) -> Union[User, None]:
        """Override default authentication to allow for both email and
        username login.

        :param login: Username or email address.
        :param password: Password.
        """
        if login is None:
            login = kwargs.get(User.USERNAME_FIELD)
        if login is None or password is None:
            return
        user = User._default_manager.filter(
            Q(username__iexact=login) | Q(email__iexact=login)
        )
        if user:
            user = user[0]
            if user.check_password(password) and self.user_can_authenticate(user):
                return user
        else:
            # Run the default password hasher once to reduce the timing
            # difference between an existing and a nonexistent user (#20760).
            User().set_password(password)
            return
