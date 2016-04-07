(function() {
  'use strict';

  angular.module('clikhomeHR.support')
         .controller('LogsController', LogsController);

  LogsController.$inject = ['Support'];

  function LogsController(Support) {
    var vm = this;
    vm.list = [];

    Support.logs().then(function(response) {
      vm.list = response;
    });
  }
})();
