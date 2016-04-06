(function() {
  'use strict';

  angular.module('clikhomeHR.auth')
         .controller('ActivationController', ActivationController);

  ActivationController.$inject = ['$rootScope', '$state', '$stateParams', 'djangoAuth'];

  function ActivationController($rootScope, $state, $stateParams, djangoAuth) {
    activate();

    function activate() {
      djangoAuth.activate($stateParams.activateKey)
                .then(activationSuccess, activationError);
    }

    function activationSuccess() {
      djangoAuth.authenticationStatus(true, true).then(function(response) {
        $rootScope.$broadcast('djangoAuth.logged_in', { user: response });
        $state.go('app.profile');
      });
    }

    function activationError() {
      $state.go('login');
    }
  }
})();

