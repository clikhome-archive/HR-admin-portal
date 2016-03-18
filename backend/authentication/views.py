from rest_framework import mixins, viewsets
from serializers import UserDetailsSerializer, SignUpSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import get_object_or_404
from models import Account, Department
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import authenticate, login
from dal import autocomplete
from django.db.models.query import Q


class ProfileViewSet(viewsets.GenericViewSet):
    '''
    Get/Set profile
    '''
    serializer_class = UserDetailsSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user

    def list(self, request, *args, **kwargs):
        '''
        It's a hack for GET
        '''
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        '''
        It's hack for POST
        '''
        serializer = self.get_serializer(self.get_object(), data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class SignUpViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = SignUpSerializer

    def create(self, request, *args, **kwargs):
        super(SignUpViewSet, self).create(request, *args, **kwargs)
        return Response({'detail': _('We sent you an activation email, please check your email now.')},
                        status=status.HTTP_201_CREATED)


class ActivateViewSet(viewsets.GenericViewSet):
    lookup_field = 'activate_key'

    def get_object(self):
        filter_kwargs = {
            'activate_key': self.kwargs['activate_key'],
            'is_active': False}
        return get_object_or_404(Account, **filter_kwargs)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = True
        instance.save()
        user = authenticate(instance=instance)
        login(request, user)
        return Response({'detail': _('Your account is activated')},
                        status=status.HTTP_202_ACCEPTED)


class AccountSelect2QuerySetView(autocomplete.Select2QuerySetView):
    def get_queryset(self):
        if not self.request.user.is_authenticated() or not self.request.user.is_staff:
            return Account.objects.none()
        qs = Account.objects.all()
        if self.q:
            qs = qs.filter(Q(first_name__icontains=self.q) |
                           Q(last_name__icontains=self.q) |
                           Q(company_name__icontains=self.q) |
                           Q(email__icontains=self.q) |
                           Q(phone__icontains=self.q))\
                .filter(is_active=True)
        return qs


class DepartmentSelect2QuerySetView(autocomplete.Select2QuerySetView):
    def get_queryset(self):
        if not self.request.user.is_authenticated() or not self.request.user.is_staff:
            return Department.objects.none()
        qs = Department.objects.all()
        if self.q:
            qs = qs.filter(name__icontains=self.q)
        return qs