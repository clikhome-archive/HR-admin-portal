from rest_framework import serializers
from models import Invoice, Subscription
from authentication.models import Department, Company, Account


class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        read_only_fields = fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        read_only_fields = fields = ['email', 'first_name', 'last_name', 'phone']


class DepartmentsSerializer(serializers.ModelSerializer):
    users = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Department
        read_only_fields = fields = '__all__'


class CompanySerializer(serializers.ModelSerializer):
    users = UserSerializer(many=True, read_only=True)
    departments = DepartmentsSerializer(many=True, read_only=True)

    class Meta:
        model = Company
        read_only_fields = fields = '__all__'


class SubscriptionSerializer(serializers.ModelSerializer):
    invoices = InvoiceSerializer(many=True, read_only=True)
    departments = DepartmentsSerializer(many=True, read_only=True)
    company = CompanySerializer(many=False, read_only=True)

    class Meta:
        model = Subscription
        read_only_fields = fields = '__all__'
