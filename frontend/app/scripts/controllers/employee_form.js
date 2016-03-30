'use strict';

angular.module('clikhomeHR')
  .controller('EmployeeFormCtrl', ["$state", "$scope", "$location", "$stateParams", "Employee", "Validate", function ($state, $scope, $location, $stateParams, Employee, Validate) {
    $scope.save_button_text = 'Create new profile';
    $scope.model = {
      'id': '',
      'first_name': '',
      'last_name': '',
      'email': '',
      'phone': '',
      'job_title': ''
    };

    if ($stateParams.id) {
      Employee.edit($stateParams.id).then(function(response){
          $scope.save_button_text = 'Save changes';
          $scope.model = {
            'id': response.id,
            'first_name': response.first_name,
            'last_name': response.last_name,
            'email': response.email,
            'phone': response.phone,
            'job_title': response.job_title
          };
        });
    }

    $scope.store = function(formData) {
      $scope.errors = [];
      Validate.form(formData, $scope.errors);
      if (!formData.$invalid) {
        Employee.save($scope.model)
          .then(function(data){
            $state.go('app.employee.list')
          }, function(data){
            $scope.errors = data;
          });
      }
    }
  }]);
