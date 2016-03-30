(function() {
  'use strict';

  angular.module('clikhomeHR.core')
         .service('Invoice', Invoice);

  Invoice.$inject = ['djangoHttp'];

  function Invoice(djangoHttp) {
    var service = {
      getList: getList
    };
    return service;

    function getList() {
      return djangoHttp.request({
        'method': 'GET',
        'url': '/billing/invoices/'
      });
    }
  }
})();
