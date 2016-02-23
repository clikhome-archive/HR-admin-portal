'use strict';

angular.module('ClikhomeApp')
  .controller('RequestdEmployeeCtrl', ["$state", "$scope", "$location", "$stateParams", "RelocationRequest", "Validate", function ($state, $scope, $location, $stateParams, RelocationRequest, Validate) {
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

    $scope.store = function(formData) {
      $scope.errors = [];
      Validate.form_validation(formData, $scope.errors);
      if (!formData.$invalid) {
        RelocationRequest.save($scope.model)
          .then(function(data){
            $state.go('app.relocation.history')
          }, function(data){
            $scope.errors = data;
          });
      }
    }
  }]);
