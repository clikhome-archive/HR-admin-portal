(function() {
  'use strict';

  angular.module('clikhomeHR.core')
         .controller('AppController', AppController);

  AppController.$inject = ['$rootScope', 'djangoAuth', '$window', 'layoutSwitcher'];

  function AppController($rootScope, djangoAuth, $window, layoutSwitcher) {
    var vm = this;
    vm.isMainSearchActive = false;
    vm.navbarCollapsed = true;
    vm.toggleMenu = layoutSwitcher.toggleMenu;
    vm.$back = function() { $window.history.back(); };
    // Assume user is not logged in until we hear otherwise
    vm.user = null;

    activate();

    function activate() {
      // Wait for the status of authentication, set scope var to true if it resolves
      djangoAuth.authenticationStatus(true).then(
        function(response) {
          $rootScope.$broadcast('djangoAuth.logged_in', { user: response });
        });

      // Wait and respond to the logout event.
      $rootScope.$on('djangoAuth.logged_out', function() {
        vm.user = null;
      });
      // Wait and respond to the log in event.
      $rootScope.$on('djangoAuth.logged_in', function(event, response) {
        vm.user = {
          email: response.user.email,
          firstName: response.user.first_name,
          lastName: response.user.last_name
        };
        if (response.user.company) {
          vm.user.company = {
            name: response.user.company.name
          };
        }
        if (response.user.department && response.user.department[response.user.department.length - 1]) {
          vm.user.department = {
            name: response.user.department[response.user.department.length - 1].name
          };
        }
      });
    }
  }
})();
