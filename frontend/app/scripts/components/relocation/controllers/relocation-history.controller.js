(function() {
  'use strict';

  angular.module('clikhomeHR.relocation')
         .controller('RelocationHistoryController', RelocationHistoryController);

  RelocationHistoryController.$inject = ['RelocationRequest', 'dialogs', '$uibModal'];

  function RelocationHistoryController(RelocationRequest, dialogs, $uibModal) {
    var confirmModal = {
      templateUrl: 'views/relocation/confirm-request-cancel.modal.html',
      controller: 'ModalConfirmController',
      controllerAs: 'modal'
    };
    var vm = this;
    vm.requests = [];
    vm.confirmRequestCancel = confirmRequestCancel;

    activate();

    function activate() {
      getHistory();
    }

    function getHistory() {
      RelocationRequest.getHistory().then(function(response) {
        vm.requests = response;
      });
    }

    function cancelRequest(id) {
      RelocationRequest.cancel(id).then(function() {
        getHistory();
      }, function(response) {
        dialogs.error('Error', response.detail);
      });
    }

    function confirmRequestCancel(id) {
      var modal = $uibModal.open(confirmModal);
      modal.result.then(function(confirm) {
        if (confirm) {
          cancelRequest(id);
        }
      });
    }
  }
})();
