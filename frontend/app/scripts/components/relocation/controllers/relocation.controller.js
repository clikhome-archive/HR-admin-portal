(function() {
  'use strict';

  angular.module('clikhomeHR.relocation')
         .controller('RelocationController', RelocationController);

  RelocationController.$inject = ['$state', 'RelocationRequest', 'dialogs', '$uibModal'];

  function RelocationController($state, RelocationRequest, dialogs, $uibModal) {
    var confirmModal = {
      templateUrl: 'views/relocation/confirm-request.modal.html',
      controller: 'ModalConfirmController',
      controllerAs: 'modal'
    };
    var vm = this;
    vm.requests = [];
    vm.confirmSubmit = confirmSubmit;
    vm.store = submit;
    vm.deleteRequest = deleteRequest;

    activate();

    function activate() {
      // Fill page
      RelocationRequest.getList().then(function(response) {
        vm.requests = response;
      }, function(response) {
        // didn't have licenses
        dialogs.error('Error', response.detail);
      });
    }

    // show confirmation modal window
    function confirmSubmit() {
      var modal = $uibModal.open(confirmModal);
      modal.result.then(function(confirmed) {
        if (confirmed) {
          submit();
        }
      });
    }

    function submit() {
      if (!vm.requests.length) {
        dialogs.error('Error', 'You didn\'t have any employee relocation request');
      } else {
        RelocationRequest
          .processList()
          .then(function() {
            $state.go('app.relocation.history');
          }, function(response) {
            dialogs.error('Error', response.detail);
          });
      }
    }

    function deleteRequest(request) {
      RelocationRequest.delete(request.id).then(function() {
        $state.reload();
      });
    }
  }
})();
