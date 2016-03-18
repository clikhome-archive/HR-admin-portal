from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone
from django.utils.crypto import get_random_string
from django.db.utils import IntegrityError


class AccountManager(BaseUserManager):
    def create_user(self, email, password=None):
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
        account.save(using=self._db)
        return account

    def create_superuser(self, email, password):
        account = self.create_user(email,
                                password=password,
        )
        account.is_staff = account.is_superuser = account.is_active = True
        account.save(using=self._db)
        return account


class Account(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)

    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True)
    phone = models.CharField(_('Contact phone number'), max_length=40, blank=True)
    company_name = models.CharField(_('Company Name'), max_length=100, blank=True)
    company_address = models.CharField(_('Company Address'), max_length=200, blank=True)

    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_('Designates whether the user can log into this admin site.'),
    )
    is_active = models.BooleanField(
        _('active'),
        default=False,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )
    activate_key = models.CharField(verbose_name=_('Activate key'), max_length=64, unique=True)
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

    objects = AccountManager()

    USERNAME_FIELD = 'email'

    def __unicode__(self):
        return self.email

    def get_full_name(self):
        return ' '.join([self.first_name, self.last_name])

    def get_short_name(self):
        return self.first_name


class Department(models.Model):
    users = models.ManyToManyField(Account, verbose_name=_('Users'), related_name='department', blank=True)
    name = models.CharField(_('Department name'), max_length=200)
    can_use_in_procentage = models.PositiveIntegerField(_('Can use a subscription no more then %'),
                                                        default=100, help_text=_('Example: You set 50%. To this d'
                                                                                 'epartment assignet subscription'
                                                                                 ' with 1000 licenses and this '
                                                                                 'department can use only 50% '
                                                                                 'of 1000 licenses'))
    can_use_in_currency = models.PositiveIntegerField(_('Can use a subscription no more then $'),
                                                      default=10000, help_text=_('Example: You set 10$. To this d'
                                                                                 'epartment assignet subscription'
                                                                                 ' with 100$ price and this '
                                                                                 'department can use only licenses at '
                                                                                 'a price no higher than 10$'))
    can_use_in_licenses = models.PositiveIntegerField(_('Can use a subscription no more then X licenses'),
                                                      default=10000, help_text=_('Example: You set 100 licenses. To this d'
                                                                                 'epartment assignet subscription'
                                                                                 ' with 1000 licenses and this '
                                                                                 'department can use only 100 licenses'))

    def __unicode__(self):
        return self.name