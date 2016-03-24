'use strict';

angular.module('ClikhomeApp')
  .controller('MasterCtrl', ["$rootScope", "$scope", "$location", "djangoAuth", "layoutSwitcher", function ($rootScope, $scope, $location, djangoAuth, layoutSwitcher) {
    $scope.isMainSearchActive = false;
    $scope.navbarCollapsed = true;
    $scope.toggleMenu = layoutSwitcher.toggleMenu;
    // Assume user is not logged in until we hear otherwise
    $scope.authenticated = false;
    // Wait for the status of authentication, set scope var to true if it resolves
    djangoAuth.authenticationStatus(true).then(
      function (response) {
        $rootScope.$broadcast("djangoAuth.logged_in", { user: response });
        layoutSwitcher.layout(layoutSwitcher.LAYOUT_TYPES.MENU_EXPANDED);
      },
      function () {
        layoutSwitcher.layout(layoutSwitcher.LAYOUT_TYPES.LOGIN);
      });
    // Wait and respond to the logout event.
    $scope.$on('djangoAuth.logged_out', function () {
      $scope.authenticated = false;
      layoutSwitcher.layout(layoutSwitcher.LAYOUT_TYPES.LOGIN);
      $scope.email = null;
      $scope.first_name = null;
      $scope.last_name = null;
      $scope.company_name = null;
      $scope.department_name = null;
    });
    // Wait and respond to the log in event.
    $scope.$on('djangoAuth.logged_in', function (event, response) {
      $scope.authenticated = true;
      $scope.email = response.user.email;
      $scope.first_name = response.user.first_name;
      $scope.last_name = response.user.last_name;
      if (response.user.company) {
        $scope.company_name = response.user.company.name;
      }
      if (response.user.department) {
        $scope.department_name = response.user.department[response.user.department.length - 1].name;
      }

    });
    $scope.$back = function () {
      window.history.back();
    };
  }]);
