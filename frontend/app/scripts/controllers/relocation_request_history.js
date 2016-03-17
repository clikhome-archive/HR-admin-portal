'use strict';

angular.module('ClikhomeApp')
  .controller('RelocationRequestHistoryCtrl', ["$state", "$scope", "$location", "Employee", "RelocationRequest", "Validate", function ($state, $scope, $location, Employee, RelocationRequest, Validate) {
    RelocationRequest.get_history().then(function(response){
      $scope.requests = response;
    });
  }]);