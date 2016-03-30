'use strict';

angular.module('clikhomeHR')
  .service('djangoHttp', ['$q', '$http', '$cookies', function djangoHttp($q, $http, $cookies) {
    var service = {
      'API_URL': '/api/v1',
      'use_session': true,
      'request': function (args) {
        // Let's retrieve the token from the cookie, if available
        if ($cookies.token) {
          $http.defaults.headers.common.Authorization = 'Token ' + $cookies.token;
        }
        // Continue
        params = args.params || {}
        args = args || {};
        var deferred = $q.defer(),
          url = this.API_URL + args.url,
          method = args.method || "GET",
          params = params,
          data = args.data || {};
        // Fire the request, as configured.
        $http({
          url: url,
          withCredentials: this.use_session,
          method: method.toUpperCase(),
          headers: {'X-CSRFToken': $cookies['csrftoken']},
          params: params,
          data: data
        })
          .success(angular.bind(this, function (data, status, headers, config) {
            deferred.resolve(data, status);
          }))
          .error(angular.bind(this, function (data, status, headers, config) {
            console.log("error syncing with: " + url);
            // Set request status
            if (data) {
              data.status = status;
            }
            if (status == 0) {
              if (data == "") {
                data = {};
                data['status'] = 0;
                data['non_field_errors'] = ["Could not connect. Please try again."];
              }
              // or if the data is null, then there was a timeout.
              if (data == null) {
                // Inject a non field error alerting the user
                // that there's been a timeout error.
                data = {};
                data['status'] = 0;
                data['non_field_errors'] = ["Server timed out. Please try again."];
              }
            }
            deferred.reject(data, status, headers, config);
          }));
        return deferred.promise;
      }
    }
    return service;
  }]);

