(function() {
  'use strict';

  angular.module('clikhomeHR.relocation')
         .config(configure);

  configure.$inject = ['$stateProvider'];

  function configure($stateProvider) {
    $stateProvider
      .state('app.relocation', {
        url: '/relocation'
      })
      .state('app.relocation.request', {
        url: '/request',
        views: {
          'content@': {
            templateUrl: 'views/relocation/request.view.html',
            controller: 'RelocationController',
            controllerAs: 'relocation'
          }
        }
      })
      .state('app.relocation.history', {
        url: '/history',
        views: {
          'content@': {
            templateUrl: 'views/relocation/history.view.html',
            controller: 'RelocationHistoryController',
            controllerAs: 'history'
          }
        }
      });
  }
})();
