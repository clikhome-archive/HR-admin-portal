'use strict';

angular.module('ClikhomeApp')
  .service('RelocationRequest', ['$q', '$http', '$cookies', '$rootScope', '$state', 'djangoHttp', function Employee($q, $http, $cookies, $rootScope, $state, djangoHttp) {
    var service = {
      save: function(data) {
        var base_url = '/employee/relocation_request/';
        return djangoHttp.request({
          'method': data.id ? "PUT" : "POST",
          'url': data.id ? base_url + data.id + '/' : base_url,
          'data': data
        })
      },
      delete: function(_id) {
        return djangoHttp.request({
          'method': "DELETE",
          'url': '/employee/relocation_request/' + _id + '/'
        })
      },
      edit: function(_id) {
        return djangoHttp.request({
          'method': "GET",
          'url': "/employee/relocation_request/" + _id + "/"
        });
      },
      get_history: function() {
        return djangoHttp.request({
          'method': "GET",
          'url': "/employee/relocations_history/"
        });
      },
      get_list: function() {
        return djangoHttp.request({
          'method': "GET",
          'url': "/employee/relocation_requests/"
        });
      },
      process_list: function() {
        return djangoHttp.request({
          'method': "POST",
          'url': "/employee/relocation_requests/"
        });
      }
    }
    return service;
  }]);