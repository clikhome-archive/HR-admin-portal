from __future__ import unicode_literals

from django.db import models
from extended_choices import Choices
from django.utils.translation import ugettext_lazy as _
from authentication.models import Account


class Employee(models.Model):
    DURATION_CHOICE = Choices(
        ('THREE_MONTHS', 3, '3 Months'),
        ('SIX_MONTHS', 6, '6 Months'),
        ('ONE_YEAR', 1, '1 Year or longer'),
    )
    YES_NO = Choices(
        ('YES', 1, 'Yes'),
        ('NO', 0, 'No')
    )

    first_name = models.CharField(_('first name'), max_length=30,
                                  help_text=_('eg. John'))
    last_name = models.CharField(_('last name'), max_length=30,
                                 help_text=_('eg. Smith'))
    email = models.EmailField(_('Email'),
                              help_text=_('eg. John@xyz.com'))
    phone = models.CharField(_('Phone number'),
                             max_length=100,
                             help_text=_('eg. +1 (123) 456-789'))
    job_title = models.CharField(_('Job Title'), blank=True,
                                 max_length=100,
                                 help_text=_('eg. Engineer'))
    need_furniture = models.BooleanField(default=False,
         verbose_name=_('Need furniture package for this employee?'))
    duration = models.PositiveIntegerField(choices=DURATION_CHOICE,
           default=DURATION_CHOICE.THREE_MONTHS,
           verbose_name=_('How long will this employee stay?'))

    is_reusable = models.BooleanField(_('Is reusable employee?'))
    is_requested_stage = models.BooleanField(_('Is employee in requested stage?'))

    created_dt = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(Account)

    def __unicode__(self):
        return self.first_name + ' ' + self.last_name

    @property
    def duration_title(self):
        return self.DURATION_CHOICE.for_value(self.duration).display


class EmployeeRelocation(models.Model):
    STATUS_CHOICE = Choices(
        ('RECEIVED', 1, 'Received'),
        ('CONFIRMED', 2, 'Confirmed'),
        ('CANCELLED', 3, 'Cancelled')
    )

    employees = models.ManyToManyField(Employee)
    relocate_from = models.CharField(_('Relocating from'),
                                     max_length=200, blank=False)
    relocate_to = models.CharField(_('Relocating to'),
                                   max_length=200, blank=False)
    expected_moving_date = models.DateField(_('Expected moving date'),
                                            blank=False)
    status = models.PositiveIntegerField(choices=STATUS_CHOICE,
             default=STATUS_CHOICE.RECEIVED,
             verbose_name=_('Employee status'))
    created_dt = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(Account)

    def __unicode__(self):
        return u'Relocation for %s #%s' % (self.user, self.id)

    @property
    def status_title(self):
        return self.STATUS_CHOICE.for_value(self.status).display
