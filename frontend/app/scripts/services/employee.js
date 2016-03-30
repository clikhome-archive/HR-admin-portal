'use strict';

angular.module('clikhomeHR')
  .service('Employee', ['$q', '$http', '$cookies', '$rootScope', '$state', 'djangoHttp', function Employee($q, $http, $cookies, $rootScope, $state, djangoHttp) {
    var service = {
      save: function(data) {
        var base_url = '/employee/';
        return djangoHttp.request({
          'method': data.id ? "PUT" : "POST",
          'url': data.id ? base_url + data.id + '/' : base_url,
          'data': data
        })
      },
      delete: function(_id) {
        return djangoHttp.request({
          'method': "DELETE",
          'url': '/employee/' + _id + '/'
        })
      },
      edit: function(_id) {
        return djangoHttp.request({
          'method': "GET",
          'url': "/employee/" + _id + "/"
        });
      },
      get_list: function() {
        return djangoHttp.request({
          'method': "GET",
          'url': "/employee/"
        });
      },
      seaerch_employee: function(query) {
        return djangoHttp.request({
          'method': "GET",
          'url': "/employee/search/" + query + "/"
        });
      }
    }
    return service;
  }]);
