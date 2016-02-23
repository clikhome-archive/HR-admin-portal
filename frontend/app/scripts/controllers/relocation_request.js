'use strict';

angular.module('ClikhomeApp')
  .controller('RelocationRequestCtrl', ["$state", "$scope", "$location", "RelocationRequest", function ($state, $scope, $location, RelocationRequest) {

    // Fill page
    RelocationRequest.get_list().then(function(response){
      $scope.requests = response;
    });

    $scope.store = function() {
      RelocationRequest.process_list()
        .then(function(data){
          $state.go('app.relocation.history')
        });
    };

    $scope.delete_request = function(request) {
      RelocationRequest.delete(request.id).then(function(){
        $state.reload();
      })
    }
  }]);