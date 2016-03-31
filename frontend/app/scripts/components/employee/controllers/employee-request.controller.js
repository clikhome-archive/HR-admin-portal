(function() {
  'use strict';
  angular.module('clikhomeHR.employee')
         .controller('EmployeeRequestController', EmployeeRequestController);

  EmployeeRequestController.$inject = ['$state', '$stateParams', 'RelocationRequest', 'Validate', 'Employee'];

  function EmployeeRequestController($state, $stateParams, RelocationRequest, Validate, Employee) {
    var vm = this;
    var searchMode = false;
    vm.errors = [];
    vm.editing = false;
    vm.changeEmail = null;
    vm.disableEmail = false;
    vm.employeeSelect = '';
    vm.changeEmail = changeEmail;
    vm.model = constructRequest();
    vm.store = store;
    vm.gPlacesOpts = { types: ['(cities)'], language: 'en' };
    vm.selectOpts = {};

    activate();

    function activate() {
      if ($stateParams.id) {
        vm.editing = true;
        RelocationRequest.edit($stateParams.id).then(function(response) {
          vm.model = constructRequest(response);
        });
      }

      vm.selectOpts = {
        options: {
          select: function(e, ui) {
            Employee.edit(ui.item.data).then(function(response) {
              // It's not edit mission
              delete response.id;
              vm.model = constructRequest({ 'employee': response });
              searchMode = true;
            });
          },
          source: function(rx, tx) {
            Employee
              .search(rx.term)
              .then(function(response) {
                tx(
                  response.map(
                    function(obj) {
                      return {
                        'data': obj.id,
                        'value': [obj.first_name, obj.last_name, obj.email].join(' ')
                      };
                    }
                  )
                );
              });
          }
        }
      };
    }

    function constructRequest(data) {
      if (angular.isUndefined(data)) {
        data = { employee: { 'is_reusable': true } };
      }

      return {
        id: data.id,
        employee: {
          'first_name': data.employee.first_name,
          'last_name': data.employee.last_name,
          email: data.employee.email,
          phone: data.employee.phone,
          'job_title': data.employee.job_title,
          'is_reusable': data.employee.is_reusable
        },
        'need_furniture': data.need_furniture,
        duration: data.duration,
        'relocate_from': data.relocate_from,
        'relocate_to': data.relocate_to,
        'expected_moving_date': data['expected_moving_date'],
        'special_needs': data.special_needs
      };
    }

    function store(formData) {
      vm.errors = [];
      Validate.form(formData, vm.errors);
      if (!formData.$invalid) {
        RelocationRequest
          .save(vm.model)
          .then(function() {
            $state.go('app.relocation.request');
          }, function(data) {
            vm.errors = data;
          });
      }
    }

    function changeEmail() {
      if (searchMode) {
        vm.model = constructRequest();
        vm.employeeSelect = '';
        searchMode = false;
      }
    }
  }
})();
