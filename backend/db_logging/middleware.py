import logging
from django.utils.translation import ugettext_lazy as _
from db_logging import get_extra
import settings
from django.core.urlresolvers import resolve


logger = logging.getLogger('user')
KEEP_ADMIN_LOGS = getattr(settings, 'KEEP_ADMIN_LOGS', False)

class DBLoggingMiddleware(object):
    def process_response(self, request, response):
        if hasattr(request, 'user') and request.user.is_authenticated():
            if KEEP_ADMIN_LOGS is False:
                if 'admin' in resolve(request.path).namespaces:
                    return response
            logger.info(_('Enter on page'), extra=get_extra(request))
        return response