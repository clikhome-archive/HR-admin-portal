(function() {
  'use strict';

  angular.module('clikhomeHR.auth')
         .controller('SignupController', SignupController);

  SignupController.$inject = ['djangoAuth', 'Validate', 'dialogs', 'layoutSwitcher'];

  function SignupController(djangoAuth, Validate, dialogs, layoutSwitcher) {
    var vm = this;
    vm.errors = [];
    vm.email = '';
    vm.password = '';
    vm.register = register;

    activate();

    function activate() {
      layoutSwitcher.layout(layoutSwitcher.LAYOUT_TYPES.LOGIN);
    }

    function register(formData) {
      var payload = { 'email': vm.email, 'password': vm.password };
      vm.errors = [];
      Validate.form_validation(formData, vm.errors);
      if (!formData.$invalid) {
        djangoAuth.signup(payload)
                  .then(registerSuccess, registerError);
      }
    }

    function registerSuccess(data) {
      dialogs.notify('Notify', data.detail);
    }

    function registerError(data) {
      vm.errors = data;
    }
  }
})();
