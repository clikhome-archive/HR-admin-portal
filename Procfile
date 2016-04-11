web: newrelic-admin run-program gunicorn --log-file=- --workers 6 --pythonpath backend backend.wsgi
celeryworker: celery worker --app backend -c 2 -l INFO -X main_site
celerycam: python backend/manage.py celerycam
