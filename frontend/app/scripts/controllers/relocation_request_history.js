'use strict';

angular.module('clikhomeHR')
  .controller('RelocationRequestHistoryCtrl', ["$state", "$scope", "$location", "Employee", "RelocationRequest", "Validate", "dialogs", "$uibModal", function ($state, $scope, $location, Employee, RelocationRequest, Validate, dialogs, $uibModal) {
    var load_requests = function () {
      RelocationRequest.getHistory().then(function (response) {
        $scope.requests = response;
      });
    };
    load_requests();

    var cnacel = function (id) {
      RelocationRequest.cancel(id).then(function (response) {
        load_requests();
      }, function (response) {
        dialogs.error('Error', response.detail);
      });
    };

    $scope.cnacel_confirm = function (id) {
      var instance = $uibModal.open({
        templateUrl: 'views/relocation/modal_confirm_cancel.html',
        controller: 'RelocationModalConfirmCtrl'
      });

      instance.result.then(function (confirm) {
        if (confirm) {
          cnacel(id);
        }
      });
    };
  }]);
