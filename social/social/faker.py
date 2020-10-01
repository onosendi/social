import os
import datetime
from random import randint, randrange

from faker import Faker

from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import IntegrityError, transaction
from django.utils import timezone

from posts.models import Post
from users.models import Profile


faker = Faker()
User = get_user_model()


def create_users(count: int = 100) -> None:
    def get_sex():
        sex = ['M', 'F']
        return sex[randrange(2)]

    for _ in range(count):
        sex = get_sex()
        if sex == 'M':
            first = faker.first_name_male()
        else:
            first = faker.first_name_female()
        last = faker.last_name()
        password = None
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
                        'sex': sex,
                    }
                    Profile.objects\
                        .filter(user_id=user.id)\
                        .update(**profile_data)
            except IntegrityError:
                random_number = randint(0, 9)
                username = f'{username}{random_number}'
            else:
                break


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


def set_images():
    base_dir = settings.BASE_DIR
    male_img_dir = 'fake/male'
    female_img_dir = 'fake/female'
    users = User.objects.all()
    for user in users:
        if user.profile.sex:
            profile_image_list = Profile.objects\
                .values_list('image', flat=True)
            used_image_list = []
            for image in profile_image_list:
                image_split = image.split('/')
                filename = image_split.pop()
                if filename:
                    used_image_list.append(filename)
            if user.profile.sex == 'M':
                sex_img_dir = male_img_dir
            else:
                sex_img_dir = female_img_dir
            image_dir = os.path.join(base_dir, 'media', sex_img_dir)
            dir_image_list = os.listdir(image_dir)
            available_images = list(set(dir_image_list) - set(used_image_list))
            random_image = available_images[randrange(len(available_images))]
            if random_image:
                user.profile.image = os.path.join(sex_img_dir, random_image)
                user.profile.save()


def set_banners():
    base_dir = settings.BASE_DIR
    banner_dir = 'fake/banner'
    users = User.objects.all()
    for user in users:
        banner_image_list = Profile.objects\
            .values_list('banner', flat=True)
        used_image_list = []
        for image in banner_image_list:
            image_split = image.split('/')
            filename = image_split.pop()
            if filename:
                used_image_list.append(filename)
        image_dir = os.path.join(base_dir, 'media', banner_dir)
        dir_image_list = os.listdir(image_dir)
        available_images = list(set(dir_image_list) - set(used_image_list))
        random_image = available_images[randrange(len(available_images))]
        if random_image:
            user.profile.banner = os.path.join(banner_dir, random_image)
            user.profile.save()


def set_user_data():
    create_users()
    create_posts()
    create_replies()
    create_reposts()
    create_likes()
    create_followers()
    randomize_timestamps()
    set_images()
    set_banners()
