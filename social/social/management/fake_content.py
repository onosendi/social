import datetime
import os
import pathlib
from random import randrange
import shutil
from typing import Any, List, Optional

from mixer.backend.django import mixer
from faker import Faker

from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils import timezone

from posts.models import Post
from users.models import Profile

User = get_user_model()

faker = Faker()


def random_items(count: int, items: List[Any]):
    items_len = len(items)
    count = items_len if count > items_len else count
    result = []
    while True:
        if len(result) >= count:
            break
        random_item = items[randrange(items_len)]
        if random_item not in result:
            result.append(random_item)
    return result


class ManageContent:
    def __init__(self, user_count):
        self._users = mixer.cycle(user_count).blend(User)
        self._banner_images = self._get_images('banner')
        self._female_images = self._get_images('female')
        self._male_images = self._get_images('male')
        self._posts = []

    def __iter__(self):
        for user in self._users:
            yield user

    def _concat_dir(self, dir_name):
        concat_dir = os.path.join(
            settings.BASE_DIR,
            f'media/fake/out/{dir_name}',
        )

        isdir = os.path.isdir(concat_dir)
        if isdir is False:
            raise Exception(f'Directory "{concat_dir}" does not exist')

        return concat_dir

    def _create_followers(self):
        for user in self:
            follow_num = randrange(15)
            random_users = random_items(follow_num, self._users)
            for _ in range(follow_num):
                follow_user = random_users.pop()
                user.follow(follow_user)

    def _create_post_likes(self):
        for user in self:
            like_num = randrange(15)
            random_posts = random_items(like_num, self._posts)
            for _ in range(like_num):
                post = random_posts.pop()
                post.liked.add(user)

    def _create_posts(self):
        for user in self:
            post_num = randrange(15)
            for _ in range(post_num):
                self._posts += [mixer.blend(Post, author=user)]

    def _create_profiles(self):
        for user in self:
            sex = ['M', 'F'][randrange(2)]
            if sex == 'M':
                dir_name = 'male'
                first_name = faker.first_name_male()
                profile_image = self._male_images.pop()
            else:
                dir_name = 'female'
                first_name = faker.first_name_female()
                profile_image = self._female_images.pop()

            user.name = f'{first_name} {faker.last_name()}'
            user.save()

            Profile.objects.filter(user=user).update(
                sex=sex,
                bio=faker.company(),
                location=f'{faker.city()}, {faker.state()}',
                image=f'fake/out/{dir_name}/{profile_image}',
                banner=f'fake/out/banner/{self._banner_images.pop()}',
                website=f'https://{faker.word()}.com',
            )

    def _create_replies_reposts(self, is_repost=False):
        for user in self:
            posts = Post.objects.filter(parent=None).all()
            post_num = randrange(round(len(self._users) * .15))
            random_posts = random_items(post_num, posts)
            for _ in range(post_num):
                self._posts += [mixer.blend(
                    Post,
                    author=user,
                    is_reply=True if is_repost is False else False,
                    parent=random_posts.pop(),
                )]

    def _get_images(self, dir_name):
        directory = self._concat_dir(dir_name)
        return os.listdir(directory)

    def _randomize_post_timestamps(self):
        for post in self._posts:
            start_time = datetime.datetime(2019, 1, 1, 0, 0, 0)
            end_time = datetime.datetime.now()
            seconds_diff = round((end_time-start_time).total_seconds())
            random_seconds = randrange(seconds_diff)
            new_date = start_time + datetime.timedelta(seconds=random_seconds)
            new_date = new_date.replace(tzinfo=timezone.get_default_timezone())
            post.created_at = new_date
            post.save()

    def create(self):
        self._create_profiles()
        self._create_posts()
        self._create_replies_reposts()
        self._create_replies_reposts(is_repost=True)
        self._create_post_likes()
        self._create_followers()
        self._randomize_post_timestamps()


class ManageImages:
    """
    Get random images from a bulk image directory (in) and copy them to another
    directory (out).

    In directory file paths:
        male: BASE_DIR/media/fake/in/male
        female: BASE_DIR/media/fake/in/female
        banner: BASE_DIR/media/fake/in/banner

    Out directory file paths:
        male: BASE_DIR/media/fake/out/male
        female: BASE_DIR/media/fake/out/female
        banner: BASE_DIR/media/fake/out/banner
    """
    def __init__(self, count):
        self._count = count

    def _concat_dir(self, dir_name: str, dir_type: str):
        """
        param dir_name: male|female|banner
        param dir_type: in|out
        """
        concat_dir = os.path.join(
            settings.BASE_DIR,
            f'media/fake/{dir_type}/{dir_name}',
        )

        isdir = os.path.isdir(concat_dir)
        if dir_type == 'in' and isdir is False:
            raise Exception(f'Directory "{concat_dir}" does not exist')

        if dir_type == 'out' and isdir is False:
            pathlib.Path(concat_dir).mkdir(parents=True, exist_ok=True)

        return concat_dir

    def _copy_images_out(self, dir_name):
        in_dir = self._concat_dir(dir_name, 'in')
        out_dir = self._concat_dir(dir_name, 'out')

        images = os.listdir(in_dir)
        if not images:
            raise Exception(f'No files found in: {in_dir}')

        images_out = random_items(self._count, images)
        for image in images_out:
            in_image = os.path.join(in_dir, image)
            out_image = os.path.join(out_dir, image)
            shutil.copy(in_image, out_image)

    def all_images(self):
        self.banner_images()
        self.female_images()
        self.male_images()

    def banner_images(self):
        self._copy_images_out('banner')

    def female_images(self):
        self._copy_images_out('female')

    def male_images(self):
        self._copy_images_out('male')


def create_all(count: Optional[int] = 100):
    manage_images = ManageImages(count)
    manage_images.all_images()

    manage_content = ManageContent(count)
    manage_content.create()
