import logging

logger = logging.getLogger('user')


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def get_extra(request, **extra):
    '''
    Get extra data for logging
    '''
    base_extra = {
            'user': request.user,
            'path': request.path,
            'method': request.method,
            'post': request.POST,
            'get': request.GET,
            'data': getattr(request, 'data', None),
            'ip': get_client_ip(request)
        }
    if extra:
        base_extra.update(extra)
    return base_extra