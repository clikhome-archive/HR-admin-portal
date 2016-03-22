from rest_framework import serializers
from models import Feedback
from db_logging import logger, get_extra
from django.utils.translation import ugettext_lazy as _


class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ('subject', 'body')

    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user
        feedback = Feedback.objects.create(user=user, **validated_data)
        logger.info(_('Make feedback'), extra=get_extra(
            request, object=feedback
        ))
        return feedback