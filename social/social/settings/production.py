import os

from .base import *  # noqa

ALLOWED_HOSTS = os.environ["ALLOWED_HOSTS"].split(";")
