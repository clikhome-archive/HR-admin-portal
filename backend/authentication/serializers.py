from rest_framework import serializers
from rest_framework.authtoken.models import Token
from models import Account


class UserDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = ('email', 'first_name', 'last_name', 'company_name')
        read_only_fields = ('email', )


class TokenSerializer(serializers.ModelSerializer):
    user = UserDetailsSerializer(many=False, read_only=True)

    class Meta:
        model = Token
        fields = ('key', 'user')
