(function() {
  'use strict';

  angular.module('clikhomeHR.profile')
         .config(configure);

  configure.$inject = ['$stateProvider'];

  function configure($stateProvider) {
    $stateProvider
      .state('app.profile', {
        url: '/profile',
        views: {
          'content@': {
            templateUrl: 'views/profile/profile.view.html',
            controller: 'ProfileController',
            controllerAs: 'profile'
          }
        }
      });
  }
})();
