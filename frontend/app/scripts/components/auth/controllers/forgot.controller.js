(function() {
  'use strict';

  angular.module('clikhomeHR.auth')
         .controller('ForgotController', ForgotController);

  ForgotController.$inject = ['$state', 'djangoAuth', 'Validate', 'dialogs'];

  function ForgotController($state, djangoAuth, Validate, dialogs) {
    var vm = this;
    vm.errors = [];
    vm.email = '';
    vm.resetRequest = resetRequest;
    vm.complete = false;

    function resetRequest(formData) {
      vm.errors = [];
      Validate.form(formData, vm.errors);
      if (!formData.$invalid) {
        djangoAuth.forgotPassword(vm.email)
                  .then(requestSuccess, requestError);
      }
    }

    function requestSuccess(data) {
      var dig = dialogs.notify('Notify', data.success);
      dig.result.then(function() {
        $state.go('login');
      });
    }

    function requestError(data) {
      vm.errors = data;
    }
  }

})();
