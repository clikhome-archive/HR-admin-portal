'use strict';

angular.module('ClikhomeApp')
  .controller('SubscriptionsCtrl', ["$state", "$scope", "$location", "Subscription", function($state, $scope, $location, Subscription) {
    // Fill page
    Subscription.get_list().then(function(response){
      $scope.subscriptions = response;
    });
  }]);