(function() {
  'use strict';

  angular.module('clikhomeHR.billing')
         .controller('SubscriptionsController', SubscriptionsController);

  SubscriptionsController.$inject = ['$scope', 'Subscription'];

  function SubscriptionsController($scope, Subscription) {
    var vm = this;
    vm.list = [];

    activate();

    function activate() {
      // Fill page
      Subscription.getList().then(function(response) {
        vm.list = response;
      });
    }
  }
})();
