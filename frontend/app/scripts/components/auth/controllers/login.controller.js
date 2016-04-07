(function() {
  'use strict';

  angular.module('clikhomeHR.auth')
         .controller('LoginController', LoginController);

  LoginController.$inject = ['$state', 'djangoAuth', 'Validate'];

  function LoginController($state, djangoAuth, Validate) {
    var vm = this;
    vm.username = '';
    vm.password = '';
    vm.complete = false;
    vm.login = login;

    activate();

    function activate() {
    }

    function login(formData) {
      vm.errors = [];
      Validate.form(formData, vm.errors);
      if (!formData.$invalid) {
        djangoAuth.login(vm.username, vm.password)
                  .then(loginSuccess, loginError);
      }
    }

    function loginSuccess() {
      $state.go('app.index');
    }

    function loginError(data) {
      vm.errors = data;
    }
  }
})();
