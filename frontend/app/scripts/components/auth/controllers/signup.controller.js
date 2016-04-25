(function() {
  'use strict';

  angular.module('clikhomeHR.auth')
         .controller('SignupController', SignupController);

  SignupController.$inject = ['djangoAuth', 'Validate', 'dialogs'];

  function SignupController(djangoAuth, Validate, dialogs) {
    var vm = this;
    vm.errors = [];
    vm.firstName = '';
    vm.lastName = '';
    vm.email = '';
    vm.password = '';
    vm.phone = '';
    vm.companyName = '';
    vm.register = register;

    activate();

    function activate() {
    }

    function register(formData) {
      var payload = {
        'first_name': vm.firstName,
        'last_name': vm.lastName,
        'email': vm.email,
        'password': vm.password,
        'phone': vm.phone,
        'company_name': vm.companyName
      };
      vm.errors = [];
      Validate.form(formData, vm.errors);
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
