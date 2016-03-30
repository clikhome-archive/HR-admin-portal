(function() {
  'use strict';

  angular.module('clikhomeHR.auth')
         .controller('ResetController', ResetController);

  ResetController.$inject = ['$rootScope', '$state', '$stateParams', 'djangoAuth', 'Validate'];

  function ResetController($rootScope, $state, $stateParams, djangoAuth, Validate) {
    var vm = this;
    vm.errors = [];
    vm.newPassword1 = '';
    vm.newPassword2 = '';
    vm.complete = false;
    vm.passwordResetConfirm = passwordResetConfirm;

    activate();

    function activate() {
    }

    function passwordResetConfirm(formData) {
      var payload = {
        'new_password1': vm.newPassword1,
        'new_password2': vm.newPassword2,
        'uid': $stateParams.uidb64,
        'token': $stateParams.token
      };
      vm.errors = [];
      Validate.form_validation(formData, vm.errors);
      if (!formData.$invalid) {
        djangoAuth.password_reset_confirm(payload)
                  .then(resetSuccess, resetError);
      }
    }

    function resetSuccess() {
      djangoAuth.authenticationStatus(true, true).then(function(response) {
        $rootScope.$broadcast('djangoAuth.logged_in', { user: response });
        $state.go('app.profile');
      });
    }

    function resetError(data) {
      vm.errors = data;
    }
  }
})();
