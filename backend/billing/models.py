from django.db import models
from authentication.models import Account, Department, Company
from django.utils.translation import ugettext_lazy as _
from django.db.models import Q, F, Sum
from django.utils.timezone import now
from datetime import timedelta
from exceptions import PaymentRequired, SubscriptionNotFound
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
    _available_licenses = {}

    def get_available_licenses(self, subscription, department=None):
        if self._available_licenses.has_key(subscription.pk) or department is None:
            return self._available_licenses.get(subscription.pk,
                                                subscription.licenses)
        else:
            r = int(
                float(subscription.licenses) / 100 *
                department.can_use_in_procentage)
            if r < department.can_use_in_licenses:
                r = department.can_use_in_licenses
            if r > subscription.licenses:
                r = subscription.licenses
            self._available_licenses[subscription.pk] = r
            return r

    def withdrawal(self, user, licenses, request):
        user_departments = Department.objects.filter(users=user)
        subscriptions = self.model.objects\
            .filter(suspended=False)\
            .filter(payment_date__gte=now())\
            .filter(contract_expired_date__gte=now())\
            .filter(Q(company=user.company) | Q(departments=user_departments))\
            .order_by('payment_date')\
            .all()
        exclude = []
        subscription_have_company = False
        total_available_licenses = 0
        for subscription in subscriptions:
            departments = filter(lambda d: d in user_departments,
                                 subscription.departments.all())
            if subscription.company:
                subscription_have_company = True
            for department in departments:
                available_licenses = self.get_available_licenses(subscription, department)
                if subscription.assigned > available_licenses:
                    exclude.append(subscription.pk)
                else:
                    total_available_licenses += (available_licenses - subscription.assigned)
        subscriptions = subscriptions.exclude(pk__in=exclude)
        if not subscriptions:
            raise PaymentRequired
        if total_available_licenses < licenses and not subscription_have_company:
            raise PaymentRequired
        if sum(map(lambda s: s.licenses-s.assigned, subscriptions)) < licenses:
            raise PaymentRequired
        for subscribe in subscriptions:
            if licenses == 0:
                break
            available_licenses = self.get_available_licenses(subscribe)-subscribe.assigned
            if available_licenses >= licenses:
                subscribe.assigned += licenses
                subscribe.save()
                logger.info(_('Wwithdrawal %d licenses' % licenses),
                            extra=get_extra(request, object=subscribe))
                break
            else:
                subscribe.assigned += available_licenses
                subscribe.save()
                licenses -= available_licenses
                logger.info(_('Wwithdrawal %d licenses' % available_licenses),
                            extra=get_extra(request, object=subscribe))

    def deposite(self, user, licenses, request):
        user_departments = Department.objects.filter(users=user)
        subscriptions = self.model.objects\
            .filter(suspended=False)\
            .filter(payment_date__gte=now())\
            .filter(contract_expired_date__gte=now())\
            .filter(Q(company=user.company) | Q(departments=user_departments))\
            .order_by('-payment_date')\
            .all()
        if not subscriptions:
            raise SubscriptionNotFound
        if sum(map(lambda s: s.assigned, subscriptions)) < licenses:
            raise SubscriptionNotFound
        for subscribe in subscriptions:
            if licenses == 0:
                break
            if subscribe.assigned >= licenses:
                subscribe.assigned -= licenses
                subscribe.save()
                logger.info(_('Deposit %d licenses' % licenses),
                            extra=get_extra(request, object=subscribe))
                break
            else:
                licenses -= subscribe.assigned
                logger.info(_('Deposit %d licenses' % subscribe.assigned),
                            extra=get_extra(request, object=subscribe))
                subscribe.assigned = 0
                subscribe.save()


def get_payment_date():
    return now() + timedelta(days=30)


def get_contract_expired_date():
    return now() + timedelta(days=365)


class Subscription(models.Model):
    departments = models.ManyToManyField(Department, verbose_name=_('Departments'), blank=True)
    company = models.ForeignKey(Company, verbose_name=_('Company'), blank=True, null=True)
    invoices = models.ManyToManyField(Invoice, verbose_name=_('Invoice'), blank=True)
    payment_date = models.DateField(_('Payment date'), default=get_payment_date)
    contract_expired_date = models.DateField(_('Contract expired'), default=get_contract_expired_date)
    licenses = models.PositiveIntegerField(_('Purchased licenses'))
    assigned = models.PositiveIntegerField(_('Assigned licenses'), default=0)
    comment = models.CharField(_('Comment'), max_length=500)
    suspended = models.BooleanField(_('Suspended subscription'), default=False)
    created_dt = models.DateTimeField(_('Created'), auto_now=True)

    objects = SubscriptionManager()

    def __unicode__(self):
        return u'Subscription #%s' % self.id
