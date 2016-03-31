(function() {
  'use strict';

  angular.module('clikhomeHR.core')
         .service('Support', Support);

  Support.$inject = ['djangoHttp'];

  function Support(djangoHttp) {
    var service = {
      feedback: feedback
    };
    return service;

    function feedback(data) {
      return djangoHttp.request({
        'method': 'POST',
        'url': '/support/feedback/',
        'data': data
      });
    }
  }
})();
