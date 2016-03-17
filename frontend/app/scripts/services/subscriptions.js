'use strict';

angular.module('ClikhomeApp')
  .service('Subscription', ['$q', '$http', '$cookies', '$rootScope', '$state', 'djangoHttp', function Subscription($q, $http, $cookies, $rootScope, $state, djangoHttp) {
    var service = {
      get_list: function() {
        return djangoHttp.request({
          'method': "GET",
          'url': "/billing/subscritions/"
        });
      }
    }
    return service;
  }]);