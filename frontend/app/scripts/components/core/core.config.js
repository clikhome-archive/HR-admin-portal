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
