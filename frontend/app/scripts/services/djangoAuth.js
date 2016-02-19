'use strict';

angular.module('ClikhomeApp')
  .service('djangoAuth', function djangoAuth($q, $http, $cookies, $rootScope, $state, djangoHttp) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var service = {
      'memorizedState': null,
      'authenticated': null,
      'authPromise': null,
      'go': function (fallback) {
        this.authenticated = true;
        var targetState = this.memorizedState ? this.memorizedState : fallback;
        $state.go(targetState);
      },
      'login': function (username, password) {
        var djangoAuth = this;
        return djangoHttp.request({
          'method': "POST",
          'url': "/login/",
          'data': {
            'username': username,
            'password': password
          }
        }).then(function (data) {
          if (!djangoAuth.use_session) {
            $http.defaults.headers.common.Authorization = 'Token ' + data.key;
            $cookies.token = data.key;
          }
          djangoAuth.authenticated = true;
          $rootScope.$broadcast("djangoAuth.logged_in", data);
        });
      },
      'logout': function () {
        var djangoAuth = this;
        return djangoHttp.request({
          'method': "POST",
          'url': "/logout/"
        }).then(function (data) {
          delete $http.defaults.headers.common.Authorization;
          delete $cookies.token;
          djangoAuth.authenticated = false;
          djangoAuth.memorizedState = null;
          $rootScope.$broadcast("djangoAuth.logged_out");
          $state.go('login');
        });
      },
      'authenticationStatus': function (restrict, force) {
        // Set restrict to true to reject the promise if not logged in
        // Set to false or omit to resolve when status is known
        // Set force to true to ignore stored value and query API
        restrict = restrict || false;
        force = force || false;
        if (this.authPromise == null || force) {
          this.authPromise = djangoHttp.request({
            'method': "GET",
            'url': "/user/"
          })
        }
        var da = this;
        var getAuthStatus = $q.defer();
        this.authPromise.then(function (response) {
          da.authenticated = true;
          getAuthStatus.resolve(response);
        }, function () {
          da.authenticated = false;
          if (restrict) {
            getAuthStatus.reject("User is not logged in.");
//          } else {
//            getAuthStatus.resolve();
          }
        });
        return getAuthStatus.promise;
      }
//      'initialize': function (url, sessions) {
//        this.API_URL = url;
//        this.use_session = sessions;
//        return this.authenticationStatus();
//      }

    }
    return service;
  })
  .run(['$rootScope', '$state', 'djangoAuth', function($rootScope, $state, djangoAuth) {

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      if (!djangoAuth.authenticated) {
        if (djangoAuth.memorizedState && (!fromState.data || !fromState.data.redirectTo || toState.name !== fromState.data.redirectTo)) {
          djangoAuth.logout();
        }
        if (toState.data && toState.data.authorization && toState.data.redirectTo) {
          if (toState.data.memory) {
            djangoAuth.memorizedState = toState.name;
          }
          $state.go(toState.data.redirectTo);
        }
      }

    });
  }]);
