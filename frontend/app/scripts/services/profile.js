'use strict';

angular.module('clikhomeHR')
  .service('Profile', ['$q', '$http', '$cookies', '$rootScope', '$state', 'djangoHttp', function Employee($q, $http, $cookies, $rootScope, $state, djangoHttp) {
    var service = {
      save: function(data) {
        return djangoHttp.request({
        'method': "POST",
          'url': '/profile/',
          'data': data
        })
      },
      get: function() {
        return djangoHttp.request({
          'method': "GET",
          'url': "/profile/"
        });
      }
    }
    return service;
  }]);
