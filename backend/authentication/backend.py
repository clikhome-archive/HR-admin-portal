from models import Account
from django.contrib.auth.backends import ModelBackend


class AuthByModelBackend(ModelBackend):
    def authenticate(self, instance=None):
        if isinstance(instance, Account):
            return instance