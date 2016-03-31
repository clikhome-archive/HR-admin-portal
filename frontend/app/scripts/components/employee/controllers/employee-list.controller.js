(function() {
  'use strict';

  angular.module('clikhomeHR.employee')
         .controller('EmployeeListController', EmployeeListController);

  EmployeeListController.$inject = ['$state', 'Employee'];

  function EmployeeListController($state, Employee) {
    var vm = this;
    vm.list = [];
    vm.remove = remove;

    activate();

    function activate() {
      // Fill page
      Employee.getList().then(function(response) {
        vm.list = response;
      });
    }

    function remove(request) {
      Employee.delete(request.id).then(function() {
        $state.reload();
      });
    }
  }
})();
