from django.contrib.auth.models import BaseUserManager
from django.utils.crypto import get_random_string
from django.db.utils import IntegrityError
from django.utils.translation import ugettext_lazy as _


class AccountManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        if not email:
            raise ValueError(_('Users must have an email address'))
        account = self.model(
            email=AccountManager.normalize_email(email),
        )
        account.save()
        while True:
            account.activate_key = get_random_string(64).lower()
            try:
                account.save(using=self._db)
                break
            except IntegrityError:
                pass
        account.set_password(password)
        for field, value in kwargs.items():
            if hasattr(account, field):
                setattr(account, field, value)
            else:
                raise AttributeError(_('Field %(field)s doesn\'t exists') % {'field': field})
        account.save(using=self._db)
        return account

    def create_superuser(self, email, password):
        account = self.create_user(email,
                                password=password,
        )
        account.is_staff = account.is_superuser = account.is_active = True
        account.save(using=self._db)
        return account