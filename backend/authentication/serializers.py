from rest_framework import serializers
from rest_framework.authtoken.models import Token
from models import Account, Company, Department
from django.contrib.auth import update_session_auth_hash, login, authenticate
from rest_auth.serializers import PasswordResetConfirmSerializer as PasswordResetConfirmSerializerBase
from django.utils.translation import ugettext_lazy as _
from db_logging import get_extra, logger
from django.template.loader import get_template
from django.template import Context
from django.core.mail import EmailMultiAlternatives
from django.contrib.sites.shortcuts import get_current_site
from django.forms.models import fields_for_model
import settings


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        read_only_fields = fields = ('name', 'address')


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        read_only_fields = fields = ('name',)


class UserDetailsSerializer(serializers.ModelSerializer):
    company = CompanySerializer(many=False, read_only=True)
    department = DepartmentSerializer(many=True, read_only=True)
    password = serializers.CharField(allow_blank=True)

    class Meta:
        model = Account
        fields = ('email', 'first_name', 'last_name', 'phone', 'password', 'company', 'department')
        read_only_fields = ('email',)
        extra_kwargs = {'password': {'write_only': True}}

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.iteritems():
            setattr(instance, attr, value)
        logger.info(_('Update user profile'), extra=get_extra(self.context.get('request'),
                                                              object=instance))
        if password:
            instance.set_password(password)
            logger.info(_('Update user password'), extra=get_extra(self.context.get('request'),
                                                                   object=instance))
            update_session_auth_hash(self.context.get('request'), instance)
        instance.save()
        return instance


class TokenSerializer(serializers.ModelSerializer):
    user = UserDetailsSerializer(many=False, read_only=True)

    class Meta:
        model = Token
        fields = ('key', 'user')


class PasswordResetConfirmSerializer(PasswordResetConfirmSerializerBase):
    def save(self):
        super(PasswordResetConfirmSerializer, self).save()
        user = authenticate(username=self.user.email,
                            password=self.set_password_form.cleaned_data['new_password1'])
        login(self.context.get('request'), user)
        logger.info(_('Password reset confirm'), extra=get_extra(self.context.get('request')))


class SignUpSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company', allow_blank=True)

    class Meta:
        model = Account
        fields = ('email', 'password', 'phone', 'company_name')

    def create(self, validated_data):
        account = Account.objects.create_user(email=validated_data.get('email'),
                                    password=validated_data.get('password'),
                                    phone=validated_data.get('phone'))
        company_name = validated_data.get('company', None)
        if company_name:
            company, created = Company.objects.get_or_create(name=company_name)
            company.users.add(account)
            company.save()
        self.send_email(account)
        return account

    def send_email(self, account):
        plaintext = get_template('registration/signup.txt')
        htmly = get_template('registration/signup.html')

        current_site = get_current_site(self.context.get('request'))
        site_name = current_site.name
        domain = current_site.domain
        context = {
            'domain': domain,
            'site_name': site_name,
            'user': account,
            'protocol': 'https',
        }
        context = Context(context)

        subject, from_email = settings.EMAIL_SUBJECT, settings.EMAIL_FROM
        text_content = plaintext.render(context)
        html_content = htmly.render(context)
        msg = EmailMultiAlternatives(subject, text_content, from_email, [account.email,])
        msg.attach_alternative(html_content, "text/html")
        msg.send()