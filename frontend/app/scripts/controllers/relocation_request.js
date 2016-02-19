'use strict';

angular.module('ClikhomeApp')
  .controller('RelocationRequestCtrl', function ($state, $scope, $location, Employee, RelocationRequest, Validate) {

    // Fill page
    Employee.get_requested_employees().then(function(response){
      $scope.employees = response;
    });

    // Date input
    $scope.dateOptions = {
      changeYear: false,
      changeMonth: false,
      yearRange: '2016:-0',
      dateFormat: 'yy-mm-dd'
      };

    // Work with form
    $scope.model = {
      'relocate_from': '',
      'relocate_to': '',
      'expected_moving_date': ''
    };
    $scope.store = function(formData) {
      $scope.errors = [];
      Validate.form_validation(formData, $scope.errors);
      if (!formData.$invalid) {
        RelocationRequest.save($scope.model)
          .then(function(data){
            $state.go('app.relocation.history') // !!! RELOCATION HISTORY
          }, function(data){
            $scope.errors = data;
          });
      }
    }
    $scope.delete_employee = function(employee) {
      Employee.delete(employee.id).then(function(){
        $state.reload();
      })
    }
  });
