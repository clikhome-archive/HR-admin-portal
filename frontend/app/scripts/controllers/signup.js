'use strict';

angular.module('ClikhomeApp')
  .controller('SignupCtrl', ["$state", "$scope", "$location", "djangoAuth", "Validate", "dialogs", "layoutSwitcher", function ( $state, $scope, $location, djangoAuth, Validate, dialogs, layoutSwitcher ) {
    layoutSwitcher.layout(layoutSwitcher.LAYOUT_TYPES.LOGIN);
    $scope.model = {'email': '', 'password': ''};
    $scope.signup = function ( formData ) {
      $scope.errors = [];
      Validate.form_validation(formData, $scope.errors);
      if ( !formData.$invalid ) {
        djangoAuth.signup($scope.model)
          .then(function ( data ) {
          dialogs.notify('Notify', data.detail)
          }, function ( data ) {
            // error case
            $scope.errors = data;
          });
      }
    }
  }]);
