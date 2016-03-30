(function() {
  'use strict';

  angular.module('clikhomeHR.core')
         .service('djangoHttp', djangoHttp);

  djangoHttp.$inject = ['$q', '$http', '$cookies'];

  function djangoHttp($q, $http, $cookies) {
    var service = {
      API_URL: '/api/v1',
      useSession: true,
      request: request
    };

    return service;

    function request(args) {
      // Let's retrieve the token from the cookie, if available
      if ($cookies.token) {
        $http.defaults.headers.common.Authorization = 'Token ' + $cookies.token;
      }
      // Continue
      params = args.params || {};
      args = args || {};
      var deferred = $q.defer(),
        url = service.API_URL + args.url,
        method = args.method || 'GET',
        params = params,
        data = args.data || {};
      // Fire the request, as configured.
      $http({
        url: url,
        withCredentials: service.useSession,
        method: method.toUpperCase(),
        headers: { 'X-CSRFToken': $cookies.csrftoken },
        params: params,
        data: data
      })
        .success(angular.bind(service, function(data, status) {
          deferred.resolve(data, status);
        }))
        .error(angular.bind(service, function(data, status, headers, config) {
          console.log('error syncing with: ' + url);
          // Set request status
          if (data) {
            data.status = status;
          }
          if (status === 0) {
            if (data === '') {
              data = {};
              data.status = 0;
              data.non_field_errors = ['Could not connect. Please try again.'];
            }
            // or if the data is null, then there was a timeout.
            if (angular.isUndefined(data) || data === null) {
              // Inject a non field error alerting the user
              // that there's been a timeout error.
              data = {};
              data.status = 0;
              data.non_field_errors = ['Server timed out. Please try again.'];
            }
          }
          deferred.reject(data, status, headers, config);
        }));

      return deferred.promise;
    }
  }
})();
