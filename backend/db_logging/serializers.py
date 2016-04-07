from rest_framework import serializers
from models import Log
from authentication.models import Account


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        read_only_fields = fields = ['email', 'first_name', 'last_name']


class LogSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Log
        read_only_fields = fields = '__all__'