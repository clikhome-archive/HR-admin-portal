web: newrelic-admin run-program gunicorn --log-file=- --workers 6 --pythonpath backend backend.wsgi
celeryworker: python backend/manage.py celery worker --app backend -c 2 -l DEBUG -X main_site
celerycam: python backend/manage.py celerycam
