import os
import random
import string

from fabric.api import env, local, require, lcd
from fabric.colors import cyan
from fabric.operations import prompt

current_dir = os.getcwd()
env.project_name = 'clikhome-hr'
env.branch = 'master'
env.environments = ['developement',
                    'production']


def init():
    """
    Deploys servers
    """
    print cyan('Initializing...', bold=True)
    set_remotes()
    ask_for_aws_keys()
    for environment in env.environments:
        env.environment = environment
        create_standard_server()


def set_remotes():
    """
    Sets git remotes based on project structure
    """
    require('project_name')
    print cyan('Setting git remotes...')

    local('git remote add developement git@heroku.com:{}-developement.git'.format(env.project_name))
    local('git remote add production git@heroku.com:{}-production.git'.format(env.project_name))


def ask_for_aws_keys():
    """
    Gets AWS keys from user
    """
    env.aws_access = prompt('AWS_ACCESS_KEY_ID?')
    env.aws_secret = prompt('AWS_SECRET_ACCESS_KEY?')


def create_standard_server():
    """
    Creates a sever with a standard build
    """
    create_server()
    configure_sever()
    push()
    migrate()
    create_superuser()
    ps()
    open_heroku()


def create_server():
    """
    Creates a new server on heroku
    """
    require('environment')
    require('project_name')

    print cyan('Creating new server'.format(env.project_name, env.environment))
    require('environment')
    local('heroku create {}-{} --buildpack https://github.com/heroku/heroku-buildpack-python'
          .format(env.project_name, env.environment))


def configure_sever():
    """
    Configures server with a general configuration
    """
    require('environment')
    local('heroku addons:create heroku-postgresql --remote {}'.format(env.environment))
    local('heroku pg:backups schedule DATABASE --at "04:00 UTC" --remote {}'.format(env.environment))
    local('heroku pg:promote DATABASE_URL --remote {}'.format(env.environment))
    local('heroku addons:create newrelic:wayne --remote {}'.format(env.environment))
    local('heroku config:set NEW_RELIC_APP_NAME="{}" --remote {}'.format(env.project_name, env.environment))
    local('heroku config:set DJANGO_CONFIGURATION=Production --remote {}'.format(env.environment))
    local('heroku config:set DJANGO_SECRET_KEY="{}" --remote {}'.format(create_secret_key(), env.environment))
    set_aws_keys()


def push():
    require('environment')
    require('branch')

    print cyan('Pushing to Heroku...')
    require('environment')
    local('git push {} {}:master'.format(env.environment, env.branch))


def migrate():
    require('environment')
    local('heroku run python backend/manage.py migrate --remote {}'.format(env.environment))


def create_superuser():
    require('environment')
    local('heroku run python backend/manage.py '
          'createsuperuser --remote {}'.format(env.environment))


def ps():
    """
    Scales a web dyno on Heroku
    """
    require('environment')
    local('heroku ps:scale web=1 --remote {}'.format(env.environment))


def open_heroku():
    require('environment')
    local('heroku open --remote {}'.format(env.environment))


def set_aws_keys():
    """
    Configures S3 Keys
    """
    require('aws_access')
    require('aws_secret')
    require('project_name')

    local('heroku config:set DJANGO_AWS_ACCESS_KEY_ID={} --remote {}'
          .format(env.aws_access, env.environment))
    local('heroku config:set DJANGO_AWS_SECRET_ACCESS_KEY={} --remote {}'
          .format(env.aws_secret, env.environment))
    local('heroku config:set DJANGO_AWS_STORAGE_BUCKET_NAME={0}-{1} --remote {1}'
          .format(env.project_name, env.environment))


def create_secret_key():
    """
    Creates a random string of letters and numbers
    """
    return ''.join(random.choice(string.ascii_letters + string.digits) for i in range(30))


def developement():
    """fab dev [command]"""
    env.environment = 'developement'
    env.branch = 'master'


def production():
    """fab staging [command]"""
    env.environment = 'production'
    env.branch = 'production'