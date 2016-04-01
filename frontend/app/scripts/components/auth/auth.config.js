(function() {
  'use strict';

  angular.module('clikhomeHR.auth')
         .config(configure)
         .run(run);

  configure.$inject = ['$stateProvider'];

  function configure($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        onEnter: redirect_authorized_users,
        views: {
          'sigin@': {
            templateUrl: 'views/auth/login.view.html',
            controller: 'LoginController',
            controllerAs: 'signin'
          }
        }
      })
      .state('app.logout', {
        url: '/logout',
        onEnter: ['djangoAuth', function(djangoAuth) { djangoAuth.logout(); }]
      })
      .state('signup', {
        url: '/signup',
        onEnter: redirect_authorized_users,
        views: {
          'sigin@': {
            templateUrl: 'views/auth/signup.view.html',
            controller: 'SignupController',
            controllerAs: 'signup'
          }
        }
      })
      .state('account_activate', {
        url: '/account/activate/{activateKey}',
        onEnter: redirect_authorized_users,
        views: {
          'sigin@': {
            templateUrl: 'views/auth/activate.view.html',
            controller: 'ActivationController',
            controllerAs: 'vm'
          }
        }
      })
      .state('forgot_password', {
        url: '/forgot-password',
        onEnter: redirect_authorized_users,
        views: {
          'sigin@': {
            templateUrl: 'views/auth/forgot-password.view.html',
            controller: 'ForgotController',
            controllerAs: 'vm'
          }
        }
      })
      .state('reset_password_confirm', {
        url: '/password-reset/confirm/{uidb64}/{token}',
        onEnter: redirect_authorized_users,
        views: {
          'sigin@': {
            templateUrl: 'views/auth/password-reset.view.html',
            controller: 'ResetController',
            controllerAs: 'vm'
          }
        }
      });
  }

  redirect_authorized_users.$inject = ['djangoAuth', '$state', '$cookies'];

  function redirect_authorized_users(djangoAuth, $state, $cookies) {
   if (djangoAuth.authenticated) {
     $state.go('app.index');
   }
  }

  run.$inject = ['$rootScope', '$state', '$cookies', 'djangoAuth'];

  function run($rootScope, $state, $cookies, djangoAuth) {
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState) {
      if (djangoAuth.authenticated === null) {
        // First run
        if ($cookies.get('is_authenticated') === '1') {
          djangoAuth.authenticated = true;
        }
      }
      if (!djangoAuth.authenticated && toState.data && toState.data.authorization) {
        if (djangoAuth.memorizedState && (!fromState.data || !fromState.data.redirectTo || toState.name !== fromState.data.redirectTo)) {
          djangoAuth.logout();
        }
        if (toState.data.redirectTo) {
          if (toState.data.memory) {
            djangoAuth.memorizedState = toState.name;
          }
          $state.go(toState.data.redirectTo);
        }
      }
    });
  }
})();
