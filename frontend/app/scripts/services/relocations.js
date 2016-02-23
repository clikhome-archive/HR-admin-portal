'use strict';

angular.module('ClikhomeApp')
  .service('RelocationRequest', ['$q', '$http', '$cookies', '$rootScope', '$state', 'djangoHttp', function Employee($q, $http, $cookies, $rootScope, $state, djangoHttp) {
    var service = {
      save: function(data) {
        return djangoHttp.request({
          'method': "POST",
          'url': '/employee/relocation/',
          'data': data
        })
      },
      get_requests: function() {
        return djangoHttp.request({
          'method': "GET",
          'url': "/employee/relocation/"
        });
      }
    }
    return service;
  }]);