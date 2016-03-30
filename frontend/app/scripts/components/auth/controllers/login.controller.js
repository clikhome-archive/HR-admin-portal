(function() {
  'use strict';

  angular.module('clikhomeHR.auth')
         .controller('LoginController', LoginController);

  LoginController.$inject = ['$state', 'djangoAuth', 'Validate', 'layoutSwitcher'];

  function LoginController($state, djangoAuth, Validate, layoutSwitcher) {
    var vm = this;
    vm.username = '';
    vm.password = '';
    vm.complete = false;
    vm.login = login;

    activate();

    function activate() {
      layoutSwitcher.layout(layoutSwitcher.LAYOUT_TYPES.LOGIN);
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
      layoutSwitcher.layout(layoutSwitcher.LAYOUT_TYPES.MENU_EXPANDED);
      $state.go('app.index');
    }

    function loginError(data) {
      vm.errors = data;
    }
  }
})();
