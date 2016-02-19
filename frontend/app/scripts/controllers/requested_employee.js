'use strict';

angular.module('ClikhomeApp')
  .controller('RequestdEmployeeCtrl', function ($state, $scope, $location, $stateParams, Employee, Validate) {
    if ($stateParams.id) {
      Employee.get_employee($stateParams.id)
        .then(function(response){
          $scope.save_button_text = 'Save changes';
          $scope.model = {
            'id': response.id,
            'first_name': response.first_name,
            'last_name': response.last_name,
            'email': response.email,
            'phone': response.phone,
            'job_title': response.job_title,
            'need_furniture': response.need_furniture,
            'duration': response.duration,
            'is_reusable': response.is_reusable,
            'is_requested_stage': true
          };
        });
    } else {
      $scope.save_button_text = 'Add Employee';
      $scope.model = {
        'id': '',
        'first_name': '',
        'last_name': '',
        'email': '',
        'phone': '',
        'job_title': '',
        'need_furniture': '',
        'duration': '',
        'is_reusable': false,
        'is_requested_stage': true
      };
    }
    $scope.store = function(formData) {
      $scope.errors = [];
      Validate.form_validation(formData, $scope.errors);
      if (!formData.$invalid) {
        Employee.save($scope.model)
          .then(function(data){
            $state.go('app.relocation.request')
          }, function(data){
            $scope.errors = data;
          });
      }
    }
  });