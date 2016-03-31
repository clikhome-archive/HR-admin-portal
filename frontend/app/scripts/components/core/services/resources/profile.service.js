(function() {
  'use strict';

  angular.module('clikhomeHR.core')
         .service('Profile', Profile);

  Profile.$inject = ['djangoHttp'];

  function Profile(djangoHttp) {
    var service = {
      save: save,
      'get': getProfile
    };
    return service;

    function save(data) {
      return djangoHttp.request({
        'method': 'POST',
        'url': '/profile/',
        'data': data
      });
    }

    function getProfile() {
      return djangoHttp.request({
        'method': 'GET',
        'url': '/profile/'
      });
    }
  }
})();
