from rest_framework import serializers
from models import Invoice, Subscription


class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        read_only_fields = fields = '__all__'


class SubscriptionSerializer(serializers.ModelSerializer):
    invoice = InvoiceSerializer(many=False, read_only=True)

    class Meta:
        model = Subscription
        read_only_fields = fields = '__all__'
