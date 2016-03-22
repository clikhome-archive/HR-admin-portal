from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticated
from models import Invoice, Subscription
from serializers import InvoiceSerializer, SubscriptionSerializer
from dal import autocomplete
from django.db.models.query import Q
from authentication.models import Department


class InvoicesViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = InvoiceSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Invoice.objects.filter(user=self.request.user)


class SubscriptionsViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = SubscriptionSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user_departments = Department.objects.filter(users=self.request.user)
        return Subscription.objects\
                    .filter(
                        Q(departments__in=user_departments) |
                        Q(company=self.request.user.company)
                )


class InvoiceSelect2QuerySetView(autocomplete.Select2QuerySetView):
    def get_queryset(self):
        if not self.request.user.is_authenticated() or not self.request.user.is_staff:
            return Invoice.objects.none()
        qs = Invoice.objects.all()
        if self.q:
            qs = qs.filter(invoice_number__icontains=self.q)
        return qs