# social

### Overview
Twitter-esque social networking site.

### Technology stack
- Django / Django Rest Framework
- PostgreSQL
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
### Clone repository

    git clone https://github.com/onosendi/social.git

### Environment File
Create an `.env` file in the root directory (next to `package.json`) with the following content:

    SECRET_KEY='super secret key'
    ALLOWED_HOSTS='localhost;*'
    DATABASE_NAME='social'
    DATABASE_USER='social'
    DATABASE_PASSWORD='social'

### PostgreSQL
Create a database, user, and grant user superuser permissions. Superuser permissions have to be granted in order to use Django's `CITextExtension`.

In a PostgreSQL shell (`sudo -u postgres psql`), issue the following commands:

    postgres=# create database social;
    postgres=# create user social with encrypted password 'social';
    postgres=# grant all privileges on database social to social;
    postgres=# alter user social with superuser;

### NPM
#### Install dependencies

    npm install

#### Build/bundle assets

    npm run build

*For development, use `npm start`*

### Python/Django
#### Create virtual environment and install requirements

    python3 -m venv venv
    source venv/bin/activate
    pip3 install --upgrade pip
    pip3 install wheel
    pip3 install -r requirements/development.txt

#### Migrate Django's migrations to database

    python3 social/manage.py migrate

### Finally
#### Run Django's development server

    python3 social/manage.py runserver

Then in your browser, visit `localhost:8000` and register a new user.
