from random import randint

from faker import Faker

from django.contrib.auth import get_user_model
from django.db import IntegrityError, transaction

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
