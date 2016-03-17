from fabric.api import local


def deploy():
    local('git push -u origin master')
    local('heroku maintenance:on')
    local('git push heroku master')
    local('heroku run python backend/manage.py migrate')
    local('heroku maintenance:off')
