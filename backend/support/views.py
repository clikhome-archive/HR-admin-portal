from rest_framework import viewsets, mixins
from serializers import FeedbackSerializer
from rest_framework.permissions import IsAuthenticated
from utils.permissions import IsOwnerOfObject
from models import Feedback


class FeedbackViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = (IsAuthenticated, IsOwnerOfObject, )
