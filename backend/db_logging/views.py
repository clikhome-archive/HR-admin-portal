from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticated
from models import Log
from serializers import LogSerializer
from django.db.models.query import Q
from django.db.models import Count
from rest_framework.pagination import PageNumberPagination


class Pagination(PageNumberPagination):
    page_size = 25


class LogsViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = LogSerializer
    permission_classes = (IsAuthenticated,)
    pagination_class = Pagination

    def get_queryset(self):
        user = self.request.user
        user_company = self.request.user.company
        user_department = self.request.user.department.all()
        return Log.objects.filter(Q(user__company__in=user_company) |
                                  Q(user__department__in=user_department) |
                                  Q(user=user)).annotate(count=Count('id'))

