'use strict';

angular.module('ClikhomeApp')
  .controller('InvoicesCtrl', ["$state", "$scope", "$location", "Invoice", function($state, $scope, $location, Invoice) {
    // Fill page
    Invoice.get_list().then(function(response){
      $scope.invoices = response;
    });
  }]);