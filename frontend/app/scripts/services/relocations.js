'use strict';

angular.module('ClikhomeApp')
  .service('RelocationRequest', function Employee($q, $http, $cookies, $rootScope, $state, djangoHttp) {
    var service = {
      save: function(data) {
        return djangoHttp.request({
          'method': "POST",
          'url': '/relocation/',
          'data': data
        })
      },
      get_requests: function() {
        return djangoHttp.request({
          'method': "GET",
          'url': "/relocation/"
        });
      }
    }
    return service;
  });