import datetime
from random import randint, randrange

from faker import Faker

from django.contrib.auth import get_user_model
from django.db import IntegrityError, transaction
from django.utils import timezone

from posts.models import Post
from users.models import Profile


explicit_users = [
    ('Jim', 'Fowler'),
    ('Lucy', 'McDonald'),
    ('John', 'Cummings'),
]
faker = Faker()
User = get_user_model()


def _create_user(
    first: str = None,
    last: str = None,
) -> None:
    ''' Create the user.

    If the user exists in the database, integers will keep getting appended to
    the user's username until no error is raised. This ensures the correct
    number of users are being added from the given ``count`` parameter
    in :func:`create_users`.

    :param first: First name of user to create.
    :param last: Last name of user to create.
    '''
    # Set password to ``None`` if no first name and no last name is given. This
    # means the user is random, and not explicit. We do not want to hash random
    # users' passwords to save time.
    password = 'testing' if first is not None and last is not None else None
    if first is None:
        first = faker.first_name()
    if last is None:
        last = faker.last_name()
    username = first.lower()
    while True:
        try:
            with transaction.atomic():
                email = f'{username}@testing.com'
                user = User.objects.create_user(
                    name=f'{first} {last}',
                    username=username,
                    email=email,
                    password=password,
                )
                profile_data = {
                    'bio': faker.company(),
                    'location': f'{faker.city()}, {faker.state()}',
                }
                Profile.objects.filter(user_id=user.id).update(**profile_data)
        except IntegrityError:
            random_number = randint(0, 9)
            username = f'{username}{random_number}'
        else:
            break


def create_users(count: int = 100) -> None:
    ''' Create explicit and random users.

    The length of :var:`explicit_users` is subtracted from ``count`` so the
    correct number of users will be added.

    :param count: Number of random users to create.
    '''
    for first, last in explicit_users:
        _create_user(first, last)
    count = count - len(explicit_users)
    for _ in range(count):
        _create_user()


def create_posts():
    users = User.objects.all()
    for user in users:
        post_number = randint(0, 15)
        for _ in range(post_number):
            Post.objects.create(
                author=user,
                body=faker.paragraph(),
            )


def create_replies():
    users = User.objects.all()
    post_ids = Post.objects.filter(is_reply=False).values_list('id', flat=True)
    post_ids_length = len(post_ids)
    for user in users:
        reply_number = randint(0, round(len(users) * .15))
        for _ in range(reply_number):
            id = post_ids[randint(0, post_ids_length - 1)]
            parent = Post.objects.get(id=id)
            Post.objects.create(
                author=user,
                body=faker.paragraph(),
                is_reply=True,
                parent=parent,
            )


def create_reposts():
    users = User.objects.all()
    post_ids = Post.objects.filter(is_reply=False).values_list('id', flat=True)
    post_ids_length = len(post_ids)
    for user in users:
        repost_number = randint(0, 3)
        for _ in range(repost_number):
            id = post_ids[randint(0, post_ids_length - 1)]
            parent = Post.objects.get(id=id)
            body = '' if randint(0, 1) else faker.paragraph()
            Post.objects.create(
                author=user,
                body=body,
                parent=parent,
            )


def create_likes():
    users = User.objects.all()
    post_ids = Post.objects.values_list('id', flat=True)
    post_ids_length = len(post_ids)
    for user in users:
        like_number = round(post_ids_length * .20)
        for _ in range(like_number):
            id = post_ids[randint(1, post_ids_length - 1)]
            post = Post.objects.get(id=id)
            post.liked.add(user)


def create_followers():
    users = User.objects.all()
    user_ids = User.objects.values_list('id', flat=True)
    user_ids_length = len(user_ids)
    for user in users:
        follow_number = randint(0, round(user_ids_length * .20))
        for _ in range(follow_number):
            id = user_ids[randint(1, user_ids_length - 1)]
            followed_user = User.objects.get(id=id)
            user.follow(followed_user)


def randomize_timestamps():
    posts = Post.objects.all()
    for post in posts:
        start_time = datetime.datetime(2019, 1, 1, 0, 0, 0)
        end_time = datetime.datetime.now()
        seconds_diff = round((end_time-start_time).total_seconds())
        random_seconds = randrange(seconds_diff)
        new_date = start_time + datetime.timedelta(seconds=random_seconds)
        new_date = new_date.replace(tzinfo=timezone.get_default_timezone())
        post.created_at = new_date
        post.save()
