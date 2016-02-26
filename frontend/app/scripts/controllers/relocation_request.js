'use strict';

angular.module('ClikhomeApp')
  .controller('RelocationRequestCtrl', ["$state", "$scope", "$location", "RelocationRequest", "dialogs", function ($state, $scope, $location, RelocationRequest, dialogs) {

    // Fill page
    RelocationRequest.get_list().then(function(response){
      $scope.requests = response;
    }, function(response) {
      // didn't have licenses
      dialogs.error('Error', response.detail);
    });

    $scope.store = function() {
      if (!$scope.requests.length) {
        dialogs.error('Error', 'You didn\'t have any employee relocation request');
      } else {
        RelocationRequest.process_list()
          .then(function(data){
            $state.go('app.relocation.history')
          });
      }
    };

    $scope.delete_request = function(request) {
      RelocationRequest.delete(request.id).then(function(){
        $state.reload();
      })
    }
  }]);