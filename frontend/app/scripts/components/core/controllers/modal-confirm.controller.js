(function() {
  'use strict';

  angular.module('clikhomeHR.core')
         .controller('ModalConfirmController', ModalConfirmController);

  ModalConfirmController.$inject = ['$uibModalInstance'];

  function ModalConfirmController($uibModalInstance) {
    var vm = this;
    vm.close = $uibModalInstance.close;
  }
})();
