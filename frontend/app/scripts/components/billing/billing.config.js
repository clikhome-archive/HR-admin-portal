(function() {
  'use strict';

  angular.module('clikhomeHR.billing')
         .config(configure);

  configure.$inject = ['$stateProvider'];

  function configure($stateProvider) {
    $stateProvider
      .state('app.billing', {
        url: '/billing'
      })
      .state('app.billing.invoices', {
        url: '/invoices',
        views: {
          'content@': {
            templateUrl: 'views/billing/invoices.view.html',
            controller: 'InvoicesController',
            controllerAs: 'invoices'
          }
        }
      })
      .state('app.billing.subscriptions', {
        url: '/subscriptions',
        views: {
          'content@': {
            templateUrl: 'views/billing/subscriptions.view.html',
            controller: 'SubscriptionsController',
            controllerAs: 'subscriptions'
          }
        }
      });
  }
})();
