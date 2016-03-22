'use strict';

angular.module('ClikhomeApp')
  .controller('FeedbackCtrl', ["$state", "$scope", "$location", "Support", "dialogs", "Validate", function ($state, $scope, $location, Support, dialogs, Validate) {
    $scope.model = {'subject':'', 'body':''};

    $scope.send = function(formData){
      $scope.errors = [];
      Validate.form_validation(formData, $scope.errors);
      if(!formData.$invalid){
        Support.feedback($scope.model)
          .then(function(data){
            var dig = dialogs.notify('Notify', 'Your request successfully sent')
            dig.result.then(function(){
              $state.go('app.index');
            });
          }, function(data){
            $scope.errors = data;
          })
      }
    }
  }]);