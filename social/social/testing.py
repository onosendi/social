from typing import Optional, Tuple, Union

from faker import Faker

from django.contrib.auth import get_user_model
from django.db import IntegrityError, transaction

from posts.models import Post

faker = Faker()
User = get_user_model()


def create_post(
    author: User,
    body: Optional[str] = None,
    is_reply: bool = False,
    parent: Union[Post, None] = None,
) -> Post:
    """Create fake post.

    :param author: User authoring the post.
    :param body: Body text of the post.
    :param is_reply: `False` if the post is a post or a repost. `True` if the
        post is a reply.
    :param parent: Parent post - only exists if the post is a reply or a
        repost.
    :return: Newly created post.
    """
    return Post.objects.create(
        author=author,
        body=body or faker.paragraph(),
        is_reply=is_reply,
        parent=parent,
    )


def create_user(name: Optional[str] = None) -> Tuple[User, str]:
    """Create fake user.

    :param name: Name of the fake user.
    :return: Newly created user and their password.
    """
    password = faker.password()
    while True:
        try:
            with transaction.atomic():
                name = name or faker.name()
                username = name.split(" ")[0].lower()
                user = User.objects.create_user(
                    email=f"{username}@testing.com",
                    name=name,
                    password=password,
                    username=username,
                )
            break
        except IntegrityError:
            continue
    return user, password
