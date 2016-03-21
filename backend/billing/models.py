from django.db import models
from authentication.models import Account, Department
from django.utils.translation import ugettext_lazy as _
from django.db.models import Q
from django.utils.timezone import now
from datetime import timedelta
from exceptions import PaymentRequired
from s3direct.fields import S3DirectField
from db_logging import get_extra, logger
from django.core.urlresolvers import reverse


class Invoice(models.Model):
    user = models.ForeignKey(Account, verbose_name=_('User'))
    invoice_number = models.CharField(_('Invoice number'), max_length=255)
    invoice = S3DirectField(_('Invoice'), dest='invoices')
    comment = models.CharField(_('Comment'), max_length=500)
    created_dt = models.DateTimeField(_('Created'), auto_now=True)

    def __unicode__(self):
        return 'Invoice #%s' % self.invoice_number

    def get_admin_absolute_url(self):
        return reverse('admin:billing_invoice_change', args=(self.id,))


class SubscriptionManager(models.Manager):
    def withdrawal(self, user, licenses, request):
        subscriptions = self.model.objects\
            .filter(suspended=False)\
            .filter(payment_date__gte=now())\
            .filter(contract_expired_date__gte=now())\
            .filter(Q(users=user) | Q(departments=user.department.all()))\
            .order_by('id', 'payment_date')\
            .all()
        if not subscriptions:
            raise PaymentRequired
        if sum(map(lambda s: s.licenses-s.assigned, subscriptions)) < licenses:
            raise PaymentRequired
        for subscribe in subscriptions:
            if licenses == 0:
                break
            available_licenses = subscribe.licenses-subscribe.assigned
            if available_licenses >= licenses:
                subscribe.assigned += licenses
                subscribe.save()
                logger.info(_('Wwithdrawal %d licenses' % licenses),
                            extra=get_extra(request, object=subscribe))
                break
            else:
                subscribe.assigned = subscribe.licenses
                subscribe.save()
                licenses -= available_licenses
                logger.info(_('Wwithdrawal %d licenses' % available_licenses),
                            extra=get_extra(request, object=subscribe))


def get_payment_date():
    return now() + timedelta(days=30)


def get_contract_expired_date():
    return now() + timedelta(days=365)


class Subscription(models.Model):
    users = models.ManyToManyField(Account, verbose_name=_('User'), blank=True)
    departments = models.ManyToManyField(Department, verbose_name=_('Departments'), blank=True)
    invoices = models.ManyToManyField(Invoice, verbose_name=_('Invoice'), blank=True)
    payment_date = models.DateField(_('Payment date'), default=get_payment_date)
    contract_expired_date = models.DateField(_('Contract expired'), default=get_contract_expired_date)
    licenses = models.PositiveIntegerField(_('Purchased licenses'))
    assigned = models.PositiveIntegerField(_('Assigned licenses'), default=0)
    comment = models.CharField(_('Comment'), max_length=500)
    suspended = models.BooleanField(_('Suspended subscription'), default=False)
    created_dt = models.DateTimeField(_('Created'), auto_now=True)

    objects = SubscriptionManager()
