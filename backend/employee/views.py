from rest_framework import viewsets, mixins
from serializers import (EmployeeRelocationSerializer,
                         EmployeeSerializer,
                         EmployeeRelocationsSerializer,
                         EmployeeRelocationRequestCancelSerializer)
from models import Employee, EmployeeRelocation
from rest_framework.permissions import IsAuthenticated
from utils.permissions import IsOwnerOfObject
from rest_framework.response import Response
from dal import autocomplete
from django.db.models.query import Q


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
        return EmployeeRelocation.objects.filter(user=self.request.user,
                status=EmployeeRelocation.STATUS_CHOICE.INITIAL)


class EmployeeRelocationsViewSet(EmployeeRelocationViewSet):
    serializer_class = EmployeeRelocationsSerializer


class EmployeeRelocationsHistoryViewSet(EmployeeRelocationViewSet):
    def get_queryset(self):
        return EmployeeRelocation.objects.filter(user=self.request.user) \
             .exclude(status=EmployeeRelocation.STATUS_CHOICE.INITIAL)


class EmployeeRelocationRequestCancelViewSet(viewsets.GenericViewSet,
                                             mixins.UpdateModelMixin):
    '''
    Cancel employee relocation request
    '''
    _ignore_model_permissions = True
    _user_field = 'user'

    serializer_class = EmployeeRelocationRequestCancelSerializer
    permission_classes = (IsAuthenticated, IsOwnerOfObject, )

    def get_queryset(self):
        return EmployeeRelocation.objects.filter(user=self.request.user,
                status=EmployeeRelocation.STATUS_CHOICE.RECEIVED)


class EmployeeSearchViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    _ignore_model_permissions = True
    _user_field = 'user'

    serializer_class = EmployeeSerializer
    permission_classes = (IsAuthenticated, IsOwnerOfObject )

    def get_queryset(self):
        '''
        you can look the method `.search` in manager for model Employee
        '''
        return Employee.objects.search(self.kwargs.get('query'))\
            .filter(is_reusable=True, user=self.request.user)


class EmployeeSelect2QuerySetView(autocomplete.Select2QuerySetView):
    def get_queryset(self):
        if not self.request.user.is_authenticated() or not self.request.user.is_staff:
            return Employee.objects.none()
        qs = Employee.objects.all()
        if self.q:
            qs = qs.filter(Q(first_name__icontains=self.q) |
                           Q(last_name__icontains=self.q) |
                           Q(email__icontains=self.q) |
                           Q(phone__icontains=self.q))
        return qs