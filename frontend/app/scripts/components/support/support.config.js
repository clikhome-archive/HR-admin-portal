(function() {
  'use strict';

  angular.module('clikhomeHR.support')
         .config(configure);

  configure.$inject = ['$stateProvider'];

  function configure($stateProvider) {
    $stateProvider
      .state('app.support', {
        url: '/support'
      })
      .state('app.support.feedback', {
        url: '/feedback',
        views: {
          'content@': {
            templateUrl: 'views/support/feedback.view.html',
            controller: 'FeedbackController',
            controllerAs: 'feedback'
          }
        }
      })
      .state('app.support.logs', {
        url: '/logs?page',
        reloadOnSearch: false,
        views: {
          'content@': {
            templateUrl: 'views/support/logs.view.html',
            controller: 'LogsController',
            controllerAs: 'logs'
          }
        }
      });
  }
})();
