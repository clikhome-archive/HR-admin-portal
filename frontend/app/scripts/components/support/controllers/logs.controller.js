(function() {
  'use strict';

  angular.module('clikhomeHR.support')
         .controller('LogsController', LogsController);

  LogsController.$inject = ['Support', '$location'];

  function LogsController(Support, $location) {
    var vm = this;
    vm.list = [];
    vm.pageChanged = pageChanged;
    vm.setPage = setPage;
    vm.getLogs = getLogs;
    vm.pagination = {
      page: 1,
      pageSize: 25,
      maxSize: 10,
      count: 999999
    };

    activate();

    function activate() {
      var search = $location.search();
      if (angular.isDefined(search) && angular.isDefined(search.page)) {
        setPage(search.page);
      } else {
        setPage(1);
      }
    }

    function pageChanged() {
      getLogs();
    }

    function setPage(pagenum) {
      vm.pagination.page = pagenum;
      pageChanged();
    }

    function getLogs() {
      Support.logs(vm.pagination.page).then(
        function(response) {
          vm.pagination.count = response.count;
          vm.list = response;
          $location.search({ page: vm.pagination.page });
        },
        function(response) {
          if (response.status === 404) {
            setPage(1);
          }
        }
      );
    }
  }
})();
