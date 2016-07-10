# -*- coding: utf-8 -*-
from __future__ import absolute_import

from django.conf import settings
from django.http import HttpResponse, HttpResponseNotFound


def letsencrypt_challenge(request, token):
    """
    https://letsencrypt.github.io/acme-spec/#simple-http
    """
    if token in settings.LETSENCRYPT_CHALLENGE_TOKENS:
        return HttpResponse(settings.LETSENCRYPT_CHALLENGE_TOKENS[token], content_type='text/plain')
    else:
        return HttpResponseNotFound('Invalid challenge token', content_type='text/plain')
