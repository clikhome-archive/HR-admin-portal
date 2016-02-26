'use strict';

angular.module('ClikhomeApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'mwl.confirm',
  'ngPassword',
  'dialogs.main',
  'dialogs.default-translations',
  'ui.autocomplete'])
  .config(['$httpProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', '$interpolateProvider', function($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider, $interpolateProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('login', {
        url: '/login',
        views: {
          'sigin@': { templateUrl: 'views/login.html' }
        }
      })
      .state('app', {
        abstract: true,
        url: '',
        data: {
          authorization: true,
          redirectTo: 'login',
          memory: true
        }
      })
        .state('app.profile', {
          url: '/profile',
          views: {
            'content@': {
              templateUrl: 'views/profile/form.html'
            }
          }
        })
        .state('app.relocation', {
          url: '/relocation'
        })
          .state('app.relocation.request', {
            url: '/reuqest',
            views: {
              'content@': {
                templateUrl: 'views/relocation/request.html'
              }
            }
          })
          .state('app.relocation.history', {
            url: '/history',
            views: {
              'content@': {
                templateUrl: 'views/relocation/history.html'
              }
            }
          })
        .state('app.employee', {
          url: '/employee'
        })
          .state('app.employee.list', {
            url: '/',
            views: {
              'content@': {
                templateUrl: 'views/employee/list.html'
              }
            }
          })
          .state('app.employee.new_profile', {
            url: '/new_profile',
            views: {
              'content@': {
                templateUrl: 'views/employee/form.html'
              }
            }
          })
          .state('app.employee.edit_profile', {
            url: '/edit_profile{id:int}',
            views: {
              'content@': {
                templateUrl: 'views/employee/form.html'
              }
            }
          })
          .state('app.employee.relocation_request', {
            url: '/requested_employee',
            views: {
              'content@': {
                templateUrl: 'views/employee/relocation_request.html'
              }
            }
          })
          .state('app.employee.relocation_request_edit', {
            url: '/requested_employee/{id:int}',
            views: {
              'content@': {
                templateUrl: 'views/employee/relocation_request.html'
              }
            }
          })
        .state('app.logout', {
          url: '/logout',
          onEnter: ['djangoAuth', function(djangoAuth){
            djangoAuth.logout();
          }]
        })
        .state('app.index', {
          url: '/',
          views: {
            'content@': {
              templateUrl: 'views/index.html'
            }
          }
        });
    $locationProvider.html5Mode(true);
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
  }])
	.config(['dialogsProvider','$translateProvider',function(dialogsProvider,$translateProvider){
		dialogsProvider.useBackdrop('static');
		dialogsProvider.useEscClose(false);
		dialogsProvider.useCopy(false);
		dialogsProvider.setSize('sm');
		$translateProvider.preferredLanguage('en-US');
    $translateProvider.useSanitizeValueStrategy('sanitize');
	}]).run();
