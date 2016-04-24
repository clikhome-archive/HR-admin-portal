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
    }

    function logs(pagenum) {
      pagenum = parseInt(pagenum);
      if (isNaN(pagenum) || pagenum < 1) {
        pagenum = 1;
      }

      return djangoHttp.request({
        method: 'GET',
        url: '/support/logs/',
        params: {
          page: pagenum
        }
      });
    }
  }
})();
