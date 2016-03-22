'use strict';

angular.module('ClikhomeApp')
  .service('Support', ['djangoHttp', function Employee(djangoHttp) {
    var service = {
      feedback: function(data) {
        return djangoHttp.request({
          'method': "POST",
          'url': '/support/feedback/',
          'data': data
        })
      }
    }
    return service;
  }]);