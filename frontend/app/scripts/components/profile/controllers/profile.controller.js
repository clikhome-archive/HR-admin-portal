(function() {
  'use strict';

  angular.module('clikhomeHR.profile')
         .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$rootScope', '$state', 'Profile', 'Validate'];

  function ProfileController($rootScope, $state, Profile, Validate) {
    var vm = this;
    vm.errors = [];
    vm.firstName = '';
    vm.lastName = '';
    vm.phone = '';
    vm.password = '';
    vm.confirmPassword = '';
    vm.store = store;

    activate();

    function activate() {
      Profile.get().then(function(response) {
        vm.firstName = response.first_name;
        vm.lastName = response.last_name;
        vm.phone = response.phone;
      });
    }

    function store(formData) {
      var payload = {
        'first_name': vm.firstName,
        'last_name': vm.lastName,
        'phone': vm.phone,
        'password': vm.password,
        'confirm_password': vm.confirmPassword
      };
      vm.errors = [];
      Validate.form(formData, vm.errors);
      if (!formData.$invalid) {
        Profile.save(payload)
               .then(function(data) {
                 $rootScope.$broadcast('djangoAuth.logged_in', { 'user': data }); // Update user data
                 $state.go('app.index');
               }, function(data) {
                 vm.errors = data;
               });
      }
    }
  }
})();
