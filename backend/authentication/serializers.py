from rest_framework import serializers
from rest_framework.authtoken.models import Token
from models import Account
from django.contrib.auth import update_session_auth_hash, login, authenticate
from rest_auth.serializers import PasswordResetConfirmSerializer as PasswordResetConfirmSerializerBase

class UserDetailsSerializer(serializers.ModelSerializer):
    password = serializers.CharField(allow_blank=True)

    class Meta:
        model = Account
        fields = ('email', 'first_name', 'last_name', 'company_name', 'company_address', 'phone', 'password')
        read_only_fields = ('email', 'password')

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.iteritems():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
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