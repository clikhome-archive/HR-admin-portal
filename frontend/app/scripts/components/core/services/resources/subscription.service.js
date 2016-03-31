(function() {
  'use strict';

  angular.module('clikhomeHR.core')
         .service('Subscription', Subscription);

  Subscription.$inject = ['djangoHttp'];

  function Subscription(djangoHttp) {
    var service = {
      getList: getList
    };
    return service;

    function getList() {
      return djangoHttp.request({
        'method': 'GET',
        'url': '/billing/subscritions/'
      });
    }
  }
})();
