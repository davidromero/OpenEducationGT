from os import environ

from chalice import CORSConfig

BUCKET_NAME = environ.get('BUCKET_NAME')
BUCKET_PREFIX = environ.get('BUCKET_PREFIX')
SECRET_KEY = environ.get('SECRET_KEY')

cors_config = CORSConfig(
    allow_origin='*',
)