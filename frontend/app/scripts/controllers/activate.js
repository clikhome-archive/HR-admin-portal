'use strict';

angular.module('ClikhomeApp')
  .controller('AccountActivateCtrl', ["$rootScope", "$state", "$scope", "$location", "$stateParams", "djangoAuth", "layoutSwitcher", function ($rootScope, $state, $scope, $location, $stateParams, djangoAuth, layoutSwitcher) {
    layoutSwitcher.layout(layoutSwitcher.LAYOUT_TYPES.LOGIN);
    djangoAuth.activate($stateParams.activate_key)
      .then(function(data){
        djangoAuth.authenticationStatus(true, true).then(function(response){
          $rootScope.$broadcast("djangoAuth.logged_in", {user: response});
          $state.go('app.profile');
        });
      });
  }]);