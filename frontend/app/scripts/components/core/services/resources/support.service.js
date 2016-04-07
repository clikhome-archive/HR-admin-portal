(function() {
  'use strict';

  angular.module('clikhomeHR.core')
         .service('Support', Support);

  Support.$inject = ['djangoHttp'];

  function Support(djangoHttp) {
    var service = {
      feedback: feedback,
      logs: logs
    };
    return service;

    function feedback(data) {
      return djangoHttp.request({
        'method': 'POST',
        'url': '/support/feedback/',
        'data': data
      });
    };

    function logs() {
      return djangoHttp.request({
        method: 'GET',
        url: '/support/logs/'
      });
    }
  }
})();
