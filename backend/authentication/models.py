from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone


class AccountManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError(_('Users must have an email address'))
        account = self.model(
            email=AccountManager.normalize_email(email),
        )

        account.set_password(password)
        account.save(using=self._db)
        return account

    def create_superuser(self, email, password):
        account = self.create_user(email,
                                password=password,
        )
        account.is_staff = account.is_superuser = True
        account.save(using=self._db)
        return account


class Account(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)

    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True)
    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_('Designates whether the user can log into this admin site.'),
    )
    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

    objects = AccountManager()

    USERNAME_FIELD = 'email'

    def __unicode__(self):
        return self.email

    def get_full_name(self):
        return ' '.join([self.first_name, self.last_name])

    def get_short_name(self):
        return self.first_name