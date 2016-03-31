(function() {
  'use strict';

  angular.module('clikhomeHR.support')
         .controller('FeedbackController', FeedbackController);

  FeedbackController.$inject = ['$state', 'Support', 'dialogs', 'Validate'];

  function FeedbackController($state, Support, dialogs, Validate) {
    var vm = this;
    vm.errors = [];
    vm.subject = '';
    vm.body = '';
    vm.submit = submit;

    activate();

    function activate() {}

    function submit(formData) {
      vm.errors = [];
      Validate.form(formData, vm.errors);
      if (!formData.$invalid) {
        Support
          .feedback({ subject: vm.subject, body: vm.body })
          .then(function() {
            var dig = dialogs.notify('Notify', 'Your request successfully sent');
            dig.result.then(function() {
              $state.go('app.index');
            });
          }, function(data) {
            vm.errors = data;
          });
      }
    }
  }

})();
