from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone
from django.core.urlresolvers import reverse
from managers import AccountManager
from django.db.models import ObjectDoesNotExist


class Account(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)

    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True)
    phone = models.CharField(_('Contact phone number'), max_length=40, blank=True)
    # company = models.ForeignKey(Company, verbose_name=_('Company'), blank=True)

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
    activate_key = models.CharField(verbose_name=_('Activate key'), max_length=64, blank=True, null=True, unique=True)
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

    objects = AccountManager()

    USERNAME_FIELD = 'email'

    def __unicode__(self):
        return self.email

    def get_full_name(self):
        return ' '.join([self.first_name, self.last_name])

    def get_short_name(self):
        return self.first_name

    def get_admin_absolute_url(self):
        return reverse('admin:authentication_account_change', args=(self.id,))

    @property
    def company(self):
        try:
            return self.company_set.get()
        except ObjectDoesNotExist:
            return None

    @company.setter
    def company(self, value):
        self.company_set.clear()
        if value:
            self.company_set.add(value)


class Department(models.Model):
    # company = models.OneToOneField(Company, verbose_name=_('Company'))
    users = models.ManyToManyField(Account, verbose_name=_('Users'), related_name='department', blank=True)
    name = models.CharField(_('Department name'), max_length=200)
    can_use_in_procentage = models.PositiveIntegerField(_('Can use a subscription no more then %'),
                                                        default=100, help_text=_('Example: You set 50%. To this d'
                                                                                 'epartment assignet subscription'
                                                                                 ' with 1000 licenses and this '
                                                                                 'department can use only 50% '
                                                                                 'of 1000 licenses'))
    # can_use_in_currency = models.PositiveIntegerField(_('Can use a subscription no more then $'),
    #                                                   default=10000, help_text=_('Example: You set 10$. To this d'
    #                                                                              'epartment assignet subscription'
    #                                                                              ' with 100$ price and this '
    #                                                                              'department can use only licenses at '
    #                                                                              'a price no higher than 10$'))
    can_use_in_licenses = models.PositiveIntegerField(_('Can use a subscription no more then X licenses'),
                                                      default=10000, help_text=_('Example: You set 100 licenses. To this d'
                                                                                 'epartment assignet subscription'
                                                                                 ' with 1000 licenses and this '
                                                                                 'department can use only 100 licenses'))

    def __unicode__(self):
        return 'Company `%s`: %s' % (self.company.get().name, self.name)

    def get_admin_absolute_url(self):
        return reverse('admin:authentication_department_change', args=(self.id,))


class Company(models.Model):
    name = models.CharField(_('Company Name'), max_length=100, unique=True)
    address = models.CharField(_('Company Address'), max_length=200, blank=True)
    users = models.ManyToManyField(Account, verbose_name=_('Users'), blank=True)
    departments = models.ManyToManyField(Department, verbose_name=_('Departments'), blank=True, related_name='company')

    def __unicode__(self):
        return self.name