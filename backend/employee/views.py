from rest_framework import viewsets
from serializers import EmployeeRelocationSerializer, EmployeeSerializer
from models import Employee, EmployeeRelocation
from rest_framework.permissions import IsAuthenticated
from utils.permissions import IsOwnerOfObject


class EmployeeViewSet(viewsets.ModelViewSet):
    '''
    Get/Set reusable employees
    '''

    _ignore_model_permissions = True
    _user_field = 'user'

    serializer_class = EmployeeSerializer
    permission_classes = (IsAuthenticated, IsOwnerOfObject )

    def get_queryset(self):
        return Employee.objects.filter(is_reusable=True,
                                       user=self.request.user)


class EmployeeRelocationViewSet(viewsets.ModelViewSet):
    '''
    Get/Set relocations of all employees
    '''
    _ignore_model_permissions = True
    _user_field = 'user'

    serializer_class = EmployeeRelocationSerializer
    permission_classes = (IsAuthenticated, IsOwnerOfObject, )

    def get_queryset(self):
        return EmployeeRelocation.objects.filter(user=self.request.user)