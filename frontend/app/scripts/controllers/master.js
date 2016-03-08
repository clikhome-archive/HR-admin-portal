'use strict';

angular.module('ClikhomeApp')
  .controller('MasterCtrl', ["$rootScope", "$scope", "$location", "djangoAuth", function ($rootScope, $scope, $location, djangoAuth) {
    $scope.isMainSearchActive = false;
    // Assume user is not logged in until we hear otherwise
    $scope.authenticated = false;
    // Wait for the status of authentication, set scope var to true if it resolves
    djangoAuth.authenticationStatus(true).then(function(response){
      $rootScope.$broadcast("djangoAuth.logged_in", {user: response});
    });
    // Wait and respond to the logout event.
    $scope.$on('djangoAuth.logged_out', function() {
      $scope.authenticated = false;
      $scope.email = null;
      $scope.first_name = null;
      $scope.last_name = null;
      $scope.company_name = null;
    });
    // Wait and respond to the log in event.
    $scope.$on('djangoAuth.logged_in', function(event, response) {
      $scope.authenticated = true;
      $scope.email = response.user.email;
      $scope.first_name = response.user.first_name;
      $scope.last_name = response.user.last_name;
      $scope.company_name = response.user.company_name;
    });
    $scope.$back = function() {
      window.history.back();
    };
  }]);
