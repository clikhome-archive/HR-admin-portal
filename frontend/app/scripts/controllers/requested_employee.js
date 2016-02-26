'use strict';

angular.module('ClikhomeApp')
  .controller('RequestdEmployeeCtrl', ["$state", "$scope", "$location", "$stateParams", "RelocationRequest", "Validate", "Employee", function ($state, $scope, $location, $stateParams, RelocationRequest, Validate, Employee) {
    var fill_form = function(data) {
      $scope.model = {
        'id': data.id,
        'employee': {
            'first_name': data.employee.first_name,
            'last_name': data.employee.last_name,
            'email': data.employee.email,
            'phone': data.employee.phone,
            'job_title': data.employee.job_title,
            'is_reusable': data.employee.is_reusable
        },
        'need_furniture': data.need_furniture,
        'duration': data.duration,
        'relocate_from': data.relocate_from,
        'relocate_to': data.relocate_to,
        'expected_moving_date': data.expected_moving_date
      };
    }

    $scope.EmployeeSelectOption = {
      options: {
        select: function(e, ui) {
          Employee.edit(ui.item.data).then(function(response){
            // It's not edit mission
            delete response.id;
            fill_form({'employee': response});
            $scope.disable_email = true;
          });
        },
        source: function(rx, tx) {
          Employee.seaerch_employee(rx.term)
            .then(function(response){
              tx(
                response.map(
                  function(obj){
                    return {
                      'data': obj.id,
                      'value': [obj.first_name, obj.last_name, obj.email].join(' ')
                    }
                  }
                )
              );
            })
        }
      }
    };

    $scope.save_button_text = 'Add employee';
    var empty_data = {'employee': {}};
    fill_form(empty_data)
    $scope.disable_email = false;

    if ($stateParams.id) {
      RelocationRequest.edit($stateParams.id).then(function(response){
          $scope.save_button_text = 'Save changes';
          fill_form(response)
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
