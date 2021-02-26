import os
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve(strict=True).parent.parent.parent

# Load environment variables.
load_dotenv(os.path.join(BASE_DIR.parent, ".env"))

SECRET_KEY = os.environ["SECRET_KEY"]

DEBUG = False

ALLOWED_HOSTS = ["localhost"]


# Application definition

INSTALLED_APPS = [
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.postgres",
    "django_extensions",
    "debug_toolbar",
    "rest_framework",
    "frontend",
    "notifications",
    "posts",
    "search",
    "users.apps.UsersConfig",
]

INTERNAL_IPS = [
    "127.0.0.1",
]

MIDDLEWARE = [
    "debug_toolbar.middleware.DebugToolbarMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "social.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "social.wsgi.application"


# Database

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.environ["DATABASE_NAME"],
        "USER": os.environ["DATABASE_USER"],
        "PASSWORD": os.environ["DATABASE_PASSWORD"],
    }
}


# Password validation

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": (
            "django.contrib.auth.password_validation"
            ".UserAttributeSimilarityValidator"
        ),
    },
    {
        "NAME": ("django.contrib.auth.password_validation" ".MinimumLengthValidator"),
    },
    {
        "NAME": ("django.contrib.auth.password_validation" ".CommonPasswordValidator"),
    },
    {
        "NAME": ("django.contrib.auth.password_validation" ".NumericPasswordValidator"),
    },
]


# Internationalization

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_L10N = True
USE_TZ = True


# This is the directory for production when used with
# `./manage.py collectstatic`.
STATIC_ROOT = f"{BASE_DIR}/static/"

# This is the directory inside of the individual apps.
STATIC_URL = "/static/"

# This is where to look elsewhere for static files.
STATICFILES_DIRS = []


# Media files (everything user uploaded)
MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

# Custom `User` model.
AUTH_USER_MODEL = "users.User"

AUTHENTICATION_BACKENDS = ["social.backends.UsernameOrEmailAuth"]
