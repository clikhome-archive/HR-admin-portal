(function() {
  'use strict';

  angular.module('clikhomeHR.billing')
         .controller('InvoicesController', InvoicesController);

  InvoicesController.$inject = ['Invoice'];

  function InvoicesController(Invoice) {
    var vm = this;
    vm.list = [];

    activate();

    function activate() {
      // Fill page
      Invoice.getList().then(function(response) {
        vm.list = response;
      });
    }
  }
})();
