from rest_framework.exceptions import APIException
from rest_framework import status
from django.utils.translation import ugettext_lazy as _


class PaymentRequired(APIException):
    status_code = status.HTTP_402_PAYMENT_REQUIRED
    default_detail = _('You didn\'t have licenses for this request')


class SubscriptionNotFound(APIException):
    status_code = status.HTTP_404_NOT_FOUND
    default_detail = _('You didn\'t have subscription for this request')
