(function() {
  'use strict';

  angular.module('clikhomeHR.core')
         .config(configureRouting)
         .config(configureDialogs)
         .run();

  configureRouting.$inject = ['$httpProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', '$interpolateProvider'];

  function configureRouting($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider, $interpolateProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

    $urlRouterProvider.otherwise('/');
    $stateProvider
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
        url: '/request',
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
      .state('app.support', {
        url: '/support'
      })
      .state('app.support.feedback', {
        url: '/feedback',
        views: {
          'content@': {
            templateUrl: 'views/support/feedback.html'
          }
        }
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
  }

  configureDialogs.$inject = ['dialogsProvider', '$translateProvider'];

  function configureDialogs(dialogsProvider, $translateProvider) {
    dialogsProvider.useBackdrop('static');
    dialogsProvider.useEscClose(false);
    dialogsProvider.useCopy(false);
    dialogsProvider.setSize('sm');
    $translateProvider.preferredLanguage('en-US');
    $translateProvider.useSanitizeValueStrategy('sanitize');
  }
})();
