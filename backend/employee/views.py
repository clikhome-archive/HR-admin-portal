from rest_framework import viewsets
from serializers import EmployeeRelocationSerializer, EmployeeSerializer
from models import Employee, EmployeeRelocation
from rest_framework.permissions import IsAuthenticated
from utils.permissions import IsOwnerOfObject


class EmployeeViewSet(viewsets.ModelViewSet):
    '''
    Get all reusable employees exclude employees in requested stage
    '''
    serializer_class = EmployeeSerializer
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        return Employee.objects.filter(is_requested_stage=False,
                                       is_reusable=True,
                                       user=self.request.user)


class EmployeeRelocationViewSet(viewsets.ModelViewSet):
    '''
    Get all relocations of all employees
    '''
    _ignore_model_permissions = True
    _user_field = 'user'

    serializer_class = EmployeeRelocationSerializer
    permission_classes = (IsAuthenticated, IsOwnerOfObject, )

    def get_queryset(self):
        return EmployeeRelocation.objects.filter(user=self.request.user)


class RequestedEmployeeViewSet(viewsets.ModelViewSet):
    '''
    Get all employees in requested stage
    '''
    _ignore_model_permissions = True
    _user_field = 'user'

    serializer_class = EmployeeSerializer
    permission_classes = (IsAuthenticated, IsOwnerOfObject, )

    def get_queryset(self):
        return Employee.objects.filter(is_requested_stage=True,
                                       user=self.request.user)
