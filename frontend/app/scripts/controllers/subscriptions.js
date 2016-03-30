'use strict';

angular.module('clikhomeHR')
  .controller('SubscriptionsCtrl', ["$state", "$scope", "$location", "Subscription", function($state, $scope, $location, Subscription) {
    // Fill page
    Subscription.get_list().then(function(response){
      $scope.subscriptions = response;
    });
  }]);
