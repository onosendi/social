# social

### Overview
Twitter-esque social networking site.

This was my first project using React, Redux, and Django Rest Framework. This was a great learning experience, with many obstacles I had to overcome.

If you come across this and see something I could have done better, I am completely open to suggestions. Do not hesitate to create a pull request, or open an issue.

### Technology stack
- Django / Django Rest Framework
- PostgreSQL
- Parcel
- React
- Redux

### What it has
- Posts: Post, post reply, repost, post like.
- Following/Followers
- Profiles
- Basic settings
- Notifications: Currently uses polling, sockets would be better.
- Search
- Recommended users/posts: Does not use any special algorithm. Recommended posts are the latest posts of users who you are not following. Recommended users are users you are not following.

## Installation
### Environment File

Create an `.env` file in the root directory (next to `requirements.txt`) with the following content:

```
SECRET_KEY='super secret key'
ALLOWED_HOSTS='localhost;*'
DATABASE_NAME='social'
DATABASE_USER='social'
DATABASE_PASSWORD='social'
```

### PostgreSQL
Create a database, user, and grant user superuser permissions. Superuser permissions have to be granted in order to use Django's `CITextExtension`.

In a PostgreSQL shell (`sudo -u postgres psql`), issue the following commands:

```
postgres=# create database social;
postgres=# create user social with encrypted password 'social';
postgres=# grant all privileges on database social to social;
postgres=# alter user social with superuser;
```

### Finally

Issue the following command in the root directory:

```$ ./upgrade.sh```

If everything goes to plan, run a Django development server:

```$ social/manage.py runserver```

Then in your browser, visit `localhost:8000`
