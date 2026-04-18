# install_packages.py
import os
import subprocess
import sys

packages = [
    "Automat", "Brotli", "Django", "Markdown", "Pygments", "PyJWT", "amqp", "asgiref", "attrs",
    "autobahn", "billiard", "cachetools", "celery", "certifi", "cffi", "channels",
    "channels_redis", "charset-normalizer", "click", "click-didyoumean", "click-plugins",
    "click-repl", "colorama", "constantly", "cron-descriptor", "cryptography", "daphne",
    "django-anymail", "django-background-tasks", "django-celery-beat", "django-celery-results",
    "django-compat", "django-cors-headers", "django-encrypted-model-fields", "django-environ",
    "django-filter", "django-redis", "django-rest-paystack", "django-scheduler",
    "django-timezone-field", "django-uuidfield", "djangorestframework",
    "djangorestframework_simplejwt", "google-api-core", "google-api-python-client",
    "google-auth", "google-auth-httplib2", "googleapis-common-protos", "httplib2", "hyperlink",
    "icalendar", "idna", "incremental", "kombu", "msgpack", "paystacksdk", "pillow", "pip",
    "prompt_toolkit", "proto-plus", "protobuf", "psycopg2", "psycopg2-binary", "pyasn1",
    "pyasn1_modules", "pycparser", "pyOpenSSL", "pyotp", "pyparsing", "python-crontab",
    "python-dateutil", "python-decouple", "pytz", "redis", "requests", "rsa", "service-identity",
    "setuptools", "six", "sqlparse", "twisted-iocpsupport", "txaio", "typing_extensions", "tzdata",
    "uritemplate", "urllib3", "vine", "wcwidth", "zope.interface", "Twisted", "numpy", "environ", "python-dotenv", 'dotenv', 'confluent-kafka', 'django-kafka', "reportlab"

]


for package in packages:
    # os.system(f"pip install {package}")
    try:
        # Use a list of arguments instead of a single string
        subprocess.run([sys.executable, "-m", "pip", "install", package], check=True)
        print(f"Successfully installed {package}")
    except subprocess.CalledProcessError as e:
        print(f"Failed to install {package}: {e}")
    except FileNotFoundError:
        print("Error: pip or python executable not found.")


# ** Write this in terminal(just within the folder dir) **
# python install_packages.py
