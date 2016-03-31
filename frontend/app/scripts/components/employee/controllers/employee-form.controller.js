(function() {
  'use strict';

  angular.module('clikhomeHR.employee')
         .controller('EmployeeFormCtrl', EmployeeFormController);

  EmployeeFormController.$inject = ['$state', '$stateParams', 'Employee', 'Validate'];

  function EmployeeFormController($state, $stateParams, Employee, Validate) {
    var vm = this;
    vm.errors = [];
    vm.editing = false;
    vm.id = '';
    vm.firstName = '';
    vm.lastName = '';
    vm.email = '';
    vm.phone = '';
    vm.jobTitle = '';

    activate();

    function activate() {
      if ($stateParams.id) {
        Employee.edit($stateParams.id).then(function(response) {
          vm.editing = true;
          vm.id = response.id;
          vm.firstName = response.first_name;
          vm.lastName = response.last_name;
          vm.email = response.email;
          vm.phone = response.phone;
          vm.jobTitle = response.job_title;
        });
      }
    }

    vm.save = function(formData) {
      var payload = {
        'id': vm.id,
        'first_name': vm.firstName,
        'last_name': vm.lastName,
        'email': vm.email,
        'phone': vm.phone,
        'job_title': vm.jobTitle
      };
      vm.errors = [];
      Validate.form(formData, vm.errors);
      if (!formData.$invalid) {
        Employee.save(payload)
                .then(function() {
                  $state.go('app.employee.list');
                }, function(data) {
                  vm.errors = data;
                });
      }
    };
  }
})();
