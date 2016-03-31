(function() {
  'use strict';

  angular.module('clikhomeHR.core')
         .service('djangoAuth', djangoAuth);

  djangoAuth.$inject = ['$q', '$http', '$cookies', '$rootScope', '$state', 'djangoHttp'];

  function djangoAuth($q, $http, $cookies, $rootScope, $state, djangoHttp) {
    // AngularJS will instantiate a singleton by calling 'new' on this function

    var service = {
      memorizedState: null,
      authenticated: null,
      authPromise: null,
      go: go,
      login: login,
      signup: signup,
      activate: activate,
      logout: logout,
      forgotPassword: forgotPassword,
      passwordReset: passwordReset,
      authenticationStatus: authenticationStatus
      //initialize: initialize
    };

    return service;

    // wrapper for $state
    function go(fallback) {
      service.authenticated = true;
      var targetState = service.memorizedState ? service.memorizedState : fallback;
      $state.go(targetState);
    }

    function login(username, password) {
      return djangoHttp.request({
        'method': 'POST',
        'url': '/login/',
        'data': {
          'username': username,
          'password': password
        }
      }).then(function(data) {
        if (!service.useSession) {
          $http.defaults.headers.common.Authorization = 'Token ' + data.key;
          $cookies.token = data.key;
        }
        service.authenticated = true;
        $rootScope.$broadcast('djangoAuth.logged_in', data);
      });
    }

    function signup(data) {
      return djangoHttp.request({
        'method': 'POST',
        'url': '/account/signup/',
        'data': data
      });
    }

    function activate(activateKey) {
      return djangoHttp.request({
        'method': 'PUT',
        'url': '/account/activate/' + activateKey + '/'
      });
    }

    function logout() {
      return djangoHttp.request({
        'method': 'POST',
        'url': '/logout/'
      }).then(function() {
        delete $http.defaults.headers.common.Authorization;
        delete $cookies.token;
        service.authenticated = false;
        service.memorizedState = null;
        $rootScope.$broadcast('djangoAuth.logged_out');
        $state.go('login');
      });
    }

    function forgotPassword(email) {
      return djangoHttp.request({
        'method': 'POST',
        'url': '/password/reset/',
        'data': {
          'email': email
        }
      });
    }

    function passwordReset(data) {
      return djangoHttp.request({
        'method': 'POST',
        'url': '/password/reset/confirm/',
        'data': data
      });
    }

    function authenticationStatus(restrict, force) {
      // Set restrict to true to reject the promise if not logged in
      // Set to false or omit to resolve when status is known
      // Set force to true to ignore stored value and query API
      restrict = restrict || false;
      force = force || false;
      if (service.authPromise === null || force) {
        service.authPromise = djangoHttp.request({
          'method': 'GET',
          'url': '/user/'
        });
      }
      var getAuthStatus = $q.defer();
      service.authPromise.then(function(response) {
        service.authenticated = true;
        getAuthStatus.resolve(response);
      }, function() {
        service.authenticated = false;
        if (restrict) {
          getAuthStatus.reject('User is not logged in.');
          //          } else {
          //            getAuthStatus.resolve();
        }
      });
      return getAuthStatus.promise;
    }

    /*    function initialize(url, sessions) {
     service.API_URL = url;
     service.useSession = sessions;
     return service.authenticationStatus();
     }*/
  }
})();
