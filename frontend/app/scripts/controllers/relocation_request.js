'use strict';

angular.module('clikhomeHR')
  .controller('RelocationRequestCtrl', ["$state", "$scope", "$location", "RelocationRequest", "dialogs", "$uibModal", function ($state, $scope, $location, RelocationRequest, dialogs, $uibModal) {

    // Fill page
    RelocationRequest.getList().then(function(response){
      $scope.requests = response;
    }, function(response) {
      // didn't have licenses
      dialogs.error('Error', response.detail);
    });

    $scope.confirm = function () {
      var instance = $uibModal.open({
        templateUrl: 'views/relocation/modal_confirm.html',
        controller: 'RelocationModalConfirmCtrl'
      });

      instance.result.then(function (confirm) {
        if (confirm) {
          $scope.store();
        }
      });
    };

    $scope.store = function() {
      if (!$scope.requests.length) {
        dialogs.error('Error', 'You didn\'t have any employee relocation request');
      } else {
        RelocationRequest.processList()
          .then(function(data){
            $state.go('app.relocation.history')
          }, function(response) {
            dialogs.error('Error', response.detail);
          });
      }
    };

    $scope.delete_request = function(request) {
      RelocationRequest.delete(request.id).then(function(){
        $state.reload();
      })
    }
  }]);
