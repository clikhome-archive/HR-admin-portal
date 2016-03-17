'use strict';

/**
 * @ngdoc function
 * @name ClikhomeApp.controller:RelocationmodalconfirmctrlCtrl
 * @description
 * # RelocationmodalconfirmctrlCtrl
 * Controller of the ClikhomeApp
 */
angular.module('ClikhomeApp')
  .controller('RelocationModalConfirmCtrl', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
    $scope.close = function (result) {
      $uibModalInstance.close(result);
    }
  }]);
