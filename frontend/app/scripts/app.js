'use strict';

angular.module('ClikhomeApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'mwl.confirm'])
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
        .state('app.relocation', {
          url: '/relocation'
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
          .state('app.employee.create_relocation_request', {
            url: '/requested_employee',
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
              template: ''
            }
          },
          onEnter: ['$state', function($state){
            $state.go('app.employee.create_relocation_request');
          }]
        });
    $locationProvider.html5Mode(true);
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
}]).run();
