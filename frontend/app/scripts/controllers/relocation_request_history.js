'use strict';

angular.module('ClikhomeApp')
  .controller('RelocationRequestHistoryCtrl', function ($state, $scope, $location, Employee, RelocationRequest, Validate) {
    RelocationRequest.get_requests().then(function(response){
      $scope.requests = response;
    });


  });
