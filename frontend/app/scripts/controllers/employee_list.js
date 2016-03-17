'use strict';

angular.module('ClikhomeApp')
  .controller('EmployeeListCtrl', ["$state", "$scope", "$location", "Employee", function ($state, $scope, $location, Employee) {

    // Fill page
    Employee.get_list().then(function(response){
      $scope.employees = response;
    });

    $scope.delete_employee = function(request) {
      Employee.delete(request.id).then(function(){
        $state.reload();
      })
    }
  }]);