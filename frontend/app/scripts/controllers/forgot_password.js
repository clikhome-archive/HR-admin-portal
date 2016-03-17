'use strict';

angular.module('ClikhomeApp')
  .controller('ForgotCtrl', ["$state", "$scope", "$location", "djangoAuth", "Validate", "dialogs", function ($state, $scope, $location, djangoAuth, Validate, dialogs) {
    $scope.model = {'email':''};
  	$scope.complete = false;
    $scope.forgot_password = function(formData){
      $scope.errors = [];
      Validate.form_validation(formData, $scope.errors);
      if(!formData.$invalid){
        djangoAuth.forgot_password($scope.model.email)
          .then(function(data){
            var dig = dialogs.notify('Norift', data.success)
            dig.result.then(function(){
              $state.go('login');
            });
          }, function(data){
            $scope.errors = data;
          })
      }
    }
  }]);