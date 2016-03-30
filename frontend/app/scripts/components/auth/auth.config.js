(function() {
  'use strict';

  angular.module('clikhomeHR.auth')
         .config(configure);

  configure.$inject = ['$stateProvider'];

  function configure($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        views: {
          'sigin@': {
            templateUrl: 'views/auth/login.view.html',
            controller: 'LoginController',
            controllerAs: 'signin'
          }
        }
      })
      .state('signup', {
        url: '/signup',
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
        views: {
          'sigin@': {
            templateUrl: 'views/auth/forgot_password.view.html',
            controller: 'ForgotController',
            controllerAs: 'vm'
          }
        }
      })
      .state('reset_password_confirm', {
        url: '/password-reset/confirm/{uidb64}/{token}',
        views: {
          'sigin@': {
            templateUrl: 'views/auth/reset_password.view.html',
            controller: 'ResetController',
            controllerAs: 'vm'
          }
        }
      });
  }
})();
