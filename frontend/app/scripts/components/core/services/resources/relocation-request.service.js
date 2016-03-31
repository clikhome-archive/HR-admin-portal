(function() {
  'use strict';

  angular.module('clikhomeHR.core')
         .service('RelocationRequest', RelocationRequest);

  RelocationRequest.$inject = ['djangoHttp'];

  function RelocationRequest(djangoHttp) {
    var service = {
      save: save,
      'delete': deleteRequest,
      edit: edit,
      cancel: cancel,
      getHistory: getHistory,
      getList: getList,
      processList: processList
    };
    return service;

    function save(data) {
      var baseUrl = '/employee/relocation_request/';
      return djangoHttp.request({
        'method': data.id ? 'PUT' : 'POST',
        'url': data.id ? baseUrl + data.id + '/' : baseUrl,
        'data': data
      });
    }

    function deleteRequest(_id) {
      return djangoHttp.request({
        'method': 'DELETE',
        'url': '/employee/relocation_request/' + _id + '/'
      });
    }

    function edit(_id) {
      return djangoHttp.request({
        'method': 'GET',
        'url': '/employee/relocation_request/' + _id + '/'
      });
    }

    function cancel(_id) {
      return djangoHttp.request({
        'method': 'PUT',
        'url': '/employee/relocation_request_cancel/' + _id + '/'
      });
    }

    function getHistory() {
      return djangoHttp.request({
        'method': 'GET',
        'url': '/employee/relocations_history/'
      });
    }

    function getList() {
      return djangoHttp.request({
        'method': 'GET',
        'url': '/employee/relocation_requests/'
      });
    }

    function processList() {
      return djangoHttp.request({
        'method': 'POST',
        'url': '/employee/relocation_requests/'
      });
    }
  }
})();
