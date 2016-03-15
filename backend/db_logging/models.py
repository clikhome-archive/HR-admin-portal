from django.db import models
from authentication.models import Account
from django.utils.translation import ugettext_lazy as _
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
import json


class LogManager(models.Manager):
    def create_from_record(self, record):
        log = self.model(
            user = record.user,
            event=record.msg,
            method=record.method,
            url=record.path,
            ip=record.ip
        )
        if record.method == 'POST':
            log.data = record.post.urlencode()
            if not log.data and record.data:
                log.data = json.dumps(record.data)
        else:
            log.data = record.get.urlencode()
        if hasattr(record, 'object'):
            log.content_object = record.object
        return log.save(using=self._db)


class Log(models.Model):
    METHOD = (
        ('GET','GET'),
        ('POST', 'POST'),
    )
    user = models.ForeignKey(Account, verbose_name=_('User'))
    event = models.CharField(_('Event'), max_length=500)
    method = models.CharField(_('HTTP method'), choices=METHOD, max_length=4)
    data = models.TextField(_('Request data'))
    url = models.CharField(_('URL'), max_length=255)
    ip = models.GenericIPAddressField(_('Request IP'))
    # object = models.ForeignKey(ContentType,
    #                            verbose_name=_('Object'),
    #                            on_delete=models.SET_NULL,
    #                            null=True)
    content_type = models.ForeignKey(ContentType,
                                     on_delete=models.SET_NULL,
                                     null=True)
    object_id = models.PositiveIntegerField(null=True)
    content_object = GenericForeignKey('content_type', 'object_id')
    created_dt = models.DateTimeField(_('Created'), auto_now_add=True)

    objects = LogManager()

    def __unicode__(self):
        return '%(user)s[%(created_dt)s]: %(event)s (%(content_object)s)' % dict(
            user=repr(self.user),
            created_dt=self.created_dt,
            event=self.event,
            content_object=repr(self.content_object))

