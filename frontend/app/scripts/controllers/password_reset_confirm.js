'use strict';

angular.module('ClikhomeApp')
  .controller('PasswordResetConfirmCtrl', ["$rootScope", "$state", "$scope", "$location", "$stateParams", "djangoAuth", "Validate", function ($rootScope, $state, $scope, $location, $stateParams, djangoAuth, Validate) {
    $scope.model = {
      'new_password1':'',
      'new_password2':'',
      'uid':$stateParams.uidb64,
      'token':$stateParams.token
    };
  	$scope.complete = false;
    $scope.password_reset_confirm = function(formData){
      $scope.errors = [];
      Validate.form_validation(formData, $scope.errors);
      if(!formData.$invalid){
        djangoAuth.password_reset_confirm($scope.model)
          .then(function(data){
            djangoAuth.authenticationStatus(true, true).then(function(response){
              $rootScope.$broadcast("djangoAuth.logged_in", {user: response});
              $state.go('app.profile');
            });
          }, function(data){
            $scope.errors = data;
          })
      }
    }
  }]);