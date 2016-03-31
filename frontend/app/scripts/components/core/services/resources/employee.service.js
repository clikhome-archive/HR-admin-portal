(function() {
  'use strict';

  angular.module('clikhomeHR.core')
         .service('Employee', Employee);

  Employee.$inject = ['djangoHttp'];

  function Employee(djangoHttp) {
    var service = {
      save: save,
      'delete': deleteResource,
      edit: edit,
      getList: getList,
      search: search
    };
    return service;

    function save(data) {
      var baseUrl = '/employee/';
      return djangoHttp.request({
        'method': data.id ? 'PUT' : 'POST',
        'url': data.id ? baseUrl + data.id + '/' : baseUrl,
        'data': data
      });
    }

    function deleteResource(_id) {
      return djangoHttp.request({
        'method': 'DELETE',
        'url': '/employee/' + _id + '/'
      });
    }

    function edit(_id) {
      return djangoHttp.request({
        'method': 'GET',
        'url': '/employee/' + _id + '/'
      });
    }

    function getList() {
      return djangoHttp.request({
        'method': 'GET',
        'url': '/employee/'
      });
    }

    function search(query) {
      return djangoHttp.request({
        'method': 'GET',
        'url': '/employee/search/' + query + '/'
      });
    }
  }
})();
