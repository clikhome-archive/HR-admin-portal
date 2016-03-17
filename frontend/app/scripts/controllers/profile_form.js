'use strict';

angular.module('ClikhomeApp')
  .controller('ProfileFormCtrl', ["$rootScope", "$state", "$scope", "$location", "$stateParams", "Profile", "Validate", function ($rootScope, $state, $scope, $location, $stateParams, Profile, Validate) {
    Profile.get().then(function(response){
        $scope.model = {
          'first_name': response.first_name,
          'last_name': response.last_name,
          'company_name': response.company_name,
          'company_address': response.company_address,
          'phone': response.phone,
          'password': '',
          'confirm_password': ''
        };
      });

    $scope.store = function(formData) {
      $scope.errors = [];
      Validate.form_validation(formData, $scope.errors);
      if (!formData.$invalid) {
        Profile.save($scope.model)
          .then(function(data){
            $rootScope.$broadcast("djangoAuth.logged_in", {'user': data}); // Update user data
            $state.go('app.index')
          }, function(data){
            $scope.errors = data;
          });
      }
    }
  }]);
