'use strict';

angular.module('clikhomeHR')
  .service('Invoice', ['$q', '$http', '$cookies', '$rootScope', '$state', 'djangoHttp', function Invoice($q, $http, $cookies, $rootScope, $state, djangoHttp) {
    var service = {
      get_list: function() {
        return djangoHttp.request({
          'method': "GET",
          'url': "/billing/invoices/"
        });
      }
    }
    return service;
  }]);
