from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from models import Employee, EmployeeRelocation
from django.template.loader import get_template
from django.template import Context
from django.core.mail import EmailMultiAlternatives
from authentication.models import Account
from django.db.models import Q
import settings


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('id', 'email', 'first_name', 'last_name', 'phone', 'job_title',
                  'created_dt', 'is_reusable')
        read_only_fields = ('id', 'created_dt')

    def create(self, validated_data):
        user = self.context.get('request').user
        return Employee.objects.create(user=user, **validated_data)


class EmployeeRelocationSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer(many=False, read_only=False)

    class Meta:
        model = EmployeeRelocation
        fields = ('id', 'employee', 'relocate_from', 'relocate_to',
                  'expected_moving_date', 'status', 'status_title', 'created_dt',
                  'need_furniture', 'duration', 'duration_title')
        read_only_fields = ('id', 'created_dt', 'status', 'status_title', 'duration_title')

    def create(self, validated_data):
        user = self.context.get('request').user
        employee_data = validated_data.pop('employee')
        employee = Employee.objects.create(user=user, **employee_data)
        relocation = EmployeeRelocation.objects.create(user=user, employee=employee, **validated_data)
        self.send_email(relocation)
        return relocation

    def send_email(self, relocation_instance):
        plaintext = get_template('request_new_employee_relocation.txt')
        htmly = get_template('request_new_employee_relocation.html')
        context = Context({'relocation' : relocation_instance})

        subject, from_email = settings.EMAIL_SUBJECT, settings.EMAIL_FROM
        text_content = plaintext.render(context)
        html_content = htmly.render(context)
        mamagers = Account.objects.filter(Q(is_staff=True) | Q(is_superuser=True))
        mamagers_emails = map(lambda manager: manager.email, mamagers)
        msg = EmailMultiAlternatives(subject, text_content, from_email, mamagers_emails)
        msg.attach_alternative(html_content, "text/html")
        msg.send()
