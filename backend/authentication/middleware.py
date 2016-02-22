__author__ = 'xxl'


class AuthenticationStatusInCookiesMiddleware(object):
    '''
    Check user authentication and set cookies
    '''
    def process_response(self, request, response):
        if hasattr(request, 'user') and request.user.is_authenticated():
            response.set_cookie('is_authenticated', '1')
        else:
            response.set_cookie('is_authenticated', '0')
        return response