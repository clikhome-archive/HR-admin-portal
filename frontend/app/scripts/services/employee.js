'use strict';

angular.module('ClikhomeApp')
  .service('Employee', ['$q', '$http', '$cookies', '$rootScope', '$state', 'djangoHttp', function Employee($q, $http, $cookies, $rootScope, $state, djangoHttp) {
    var service = {
      get_remployees: function() {
        return djangoHttp.request({
          'method': "GET",
          'url': "/employee/"
        });
      }
    }
    return service;
  }]);