'use strict';

angular.module('ClikhomeApp')
  .controller('RequestdEmployeeCtrl', ["$state", "$scope", "$location", "$stateParams", "RelocationRequest", "Validate", function ($state, $scope, $location, $stateParams, RelocationRequest, Validate) {
    $scope.save_button_text = 'Add employee';
    $scope.model = {
      'id': '',
      'employee': {
          'first_name': '',
          'last_name': '',
          'email': '',
          'phone': '',
          'job_title': '',
          'is_reusable': false
      },
      'need_furniture': '',
      'duration': '',
      'relocate_from': '',
      'relocate_to': '',
      'expected_moving_date': ''
    };

    if ($stateParams.id) {
      RelocationRequest.edit($stateParams.id).then(function(response){
          $scope.save_button_text = 'Save changes';
          $scope.model = {
            'id': response.id,
            'employee': {
                'first_name': response.employee.first_name,
                'last_name': response.employee.last_name,
                'email': response.employee.email,
                'phone': response.employee.phone,
                'job_title': response.employee.job_title,
                'is_reusable': response.employee.is_reusable
            },
            'need_furniture': response.need_furniture,
            'duration': response.duration,
            'relocate_from': response.relocate_from,
            'relocate_to': response.relocate_to,
            'expected_moving_date': response.expected_moving_date
          };
        });
    }

    $scope.store = function(formData) {
      $scope.errors = [];
      Validate.form_validation(formData, $scope.errors);
      if (!formData.$invalid) {
        RelocationRequest.save($scope.model)
          .then(function(data){
            $state.go('app.relocation.request')
          }, function(data){
            $scope.errors = data;
          });
      }
    }
  }]);
