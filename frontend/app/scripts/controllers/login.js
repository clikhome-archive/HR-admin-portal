'use strict';

angular.module('ClikhomeApp')
  .controller('LoginCtrl', ["$state", "$scope", "$location", "djangoAuth", "Validate", "layoutSwitcher", function ( $state, $scope, $location, djangoAuth, Validate, layoutSwitcher ) {
    layoutSwitcher.layout(layoutSwitcher.LAYOUT_TYPES.LOGIN);
    $scope.model = {'username': '', 'password': ''};
    $scope.complete = false;
    $scope.login = function ( formData ) {
      $scope.errors = [];
      Validate.form_validation(formData, $scope.errors);
      if ( !formData.$invalid ) {
        djangoAuth.login($scope.model.username, $scope.model.password)
          .then(function ( data ) {
            // success case
            layoutSwitcher.layout(layoutSwitcher.LAYOUT_TYPES.MENU_EXPANDED);
            $location.path("/");
          }, function ( data ) {
            // error case
            $scope.errors = data;
          });
      }
    }
  }]);
