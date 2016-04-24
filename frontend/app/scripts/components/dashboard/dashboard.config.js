(function() {
  'use strict';

  angular.module('clikhomeHR.dashboard')
         .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('app.index', {
        url: '/',
        views: {
          'content@': {
            templateUrl: 'views/dashboard/dashboard.view.html'
          }
        }
      });
  }
})();
