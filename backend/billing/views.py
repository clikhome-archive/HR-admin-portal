from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticated
from models import Invoice, Subscription
from serializers import InvoiceSerializer, SubscriptionSerializer


class InvoicesViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = InvoiceSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Invoice.objects.filter(user=self.request.user)


class SubscriptionsViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = SubscriptionSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Subscription.objects.filter(user=self.request.user)