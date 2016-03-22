from django.db import models
from django.utils.translation import ugettext_lazy as _
from authentication.models import Account


class Feedback(models.Model):
    subject = models.CharField(_('Subject'), max_length=500)
    body = models.TextField(_('Body'))
    user = models.ForeignKey(Account, verbose_name=_('User'))
    created_dt = models.DateTimeField(_('Created'), auto_now=True)

    def __unicode__(self):
        return self.subject