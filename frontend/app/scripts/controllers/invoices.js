'use strict';

angular.module('clikhomeHR')
  .controller('InvoicesCtrl', ["$state", "$scope", "$location", "Invoice", function($state, $scope, $location, Invoice) {
    // Fill page
    Invoice.get_list().then(function(response){
      $scope.invoices = response;
    });
  }]);
