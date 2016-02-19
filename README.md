Setting up your enviroment
==========================

*nux
-----

1. Create the virtualenv:
```bash
  $ cd project
  $ ./build/buildenv.sh
  $ cd frontend
  $ npm install
  $ bower install
```

App installation
============

```bash
  $ cp settings.py local_settings.py
```
  * Change `local_settings.py` as you need

### Setup database schema
```bash
  $ ./manage.py migrate
  $ ./manage.py createsuperuser
```

  * Run server: `./manage.py runserver` and login into admin http://127.0.0.1:8000/admin/

Run backend
=======

Developer mode
-----

```bash
  $ ./manage.py runserver
```

Deploy
-----
https://docs.djangoproject.com/en/1.9/howto/deployment/wsgi/