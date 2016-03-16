from django.db import models
from authentication.models import Account
from django.utils.translation import ugettext_lazy as _
from django.db.models import F
from django.utils.timezone import now
from datetime import timedelta
from exceptions import PaymentRequired
from s3direct.fields import S3DirectField


class Invoice(models.Model):
    user = models.ForeignKey(Account, verbose_name=_('User'))
    invoice = S3DirectField(_('Invoice'), dest='invoices')
    comment = models.CharField(_('Comment'), max_length=500)
    created_dt = models.DateTimeField(_('Created'), auto_now=True)

    def __unicode__(self):
        return 'Invoice #%s' % self.pk


class SubscriptionManager(models.Manager):
    def withdrawal(self, user, licenses):
        subscriptions = self.model.objects\
            .filter(expired__gte=now())\
            .filter(user=user)\
            .order_by('id', 'expired')\
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
                break
            else:
                subscribe.assigned = subscribe.licenses
                subscribe.save()
                licenses -= available_licenses



def get_expired():
    return now() + timedelta(days=30)


class Subscription(models.Model):
    user = models.ForeignKey(Account, verbose_name=_('User'))
    invoice = models.ForeignKey(Invoice, verbose_name=_('Invoice'))
    expired = models.DateField(_('Expired date'), default=get_expired)
    licenses = models.PositiveIntegerField(_('Purchased licenses'))
    assigned = models.PositiveIntegerField(_('Assigned licenses'), default=0)
    comment = models.CharField(_('Comment'), max_length=500)
    created_dt = models.DateTimeField(_('Created'), auto_now=True)

    objects = SubscriptionManager()


