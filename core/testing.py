from faker import Faker

from django.db import IntegrityError, transaction

from posts.models import Post
from users.models import User

faker = Faker()


def create_post(author, body=None, is_reply=False, parent=None):
    return Post.objects.create(
        author=author,
        body=body or faker.paragraph(),
        is_reply=is_reply,
        parent=parent,
    )


def create_user():
    password = faker.password()
    while True:
        try:
            with transaction.atomic():
                name = faker.name()
                username = name.split(' ')[0].lower()
                user = User.objects.create_user(
                    email=f'{username}@testing.com',
                    name=name,
                    password=password,
                    username=username,
                )
            break
        except IntegrityError:
            continue
    return user, password
