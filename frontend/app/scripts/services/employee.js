'use strict';

angular.module('ClikhomeApp')
  .service('Employee', function Employee($q, $http, $cookies, $rootScope, $state, djangoHttp) {
    var service = {
      get_requested_employees: function() {
        return djangoHttp.request({
          'method': "GET",
          'url': "/employee/relocation_request/"
        });
      },
      get_employee: function(_id) {
        return djangoHttp.request({
          'method': "GET",
          'url': '/employee/relocation_request/'+_id+'/'
        })
      },
      save: function(data) {
        var base_url = '/employee/relocation_request/'
        return djangoHttp.request({
          'method': data.id ? "PUT" : "POST",
          'url': data.id ? base_url + data.id + '/' : base_url,
          'data': data
        })
      },
      delete: function(_id) {
        return djangoHttp.request({
          'method': "DELETE",
          'url': '/employee/relocation_request/'+_id+'/'
        })
      }
    }
    return service;
  });