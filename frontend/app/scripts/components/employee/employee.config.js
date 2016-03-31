(function() {
  'use strict';

  angular.module('clikhomeHR.employee')
         .config(configure);

  configure.$inject = ['$stateProvider'];

  function configure($stateProvider) {
    $stateProvider
      .state('app.employee', {
        url: '/employees'
      })
      .state('app.employee.list', {
        url: '/',
        views: {
          'content@': {
            templateUrl: 'views/employee/list.view.html',
            controller: 'EmployeeListController',
            controllerAs: 'employees'
          }
        }
      })
      .state('app.employee.new_profile', {
        url: '/new_profile',
        views: {
          'content@': {
            templateUrl: 'views/employee/form.view.html',
            controller: 'EmployeeFormCtrl',
            controllerAs: 'employee'
          }
        }
      })
      .state('app.employee.edit_profile', {
        url: '/edit_profile{id:int}',
        views: {
          'content@': {
            templateUrl: 'views/employee/form.view.html',
            controller: 'EmployeeFormCtrl',
            controllerAs: 'employee'
          }
        }
      })
      .state('app.employee.relocation_request', {
        url: '/requested_employee',
        views: {
          'content@': {
            templateUrl: 'views/employee/relocation-request.view.html',
            controller: 'EmployeeRequestController',
            controllerAs: 'vm'
          }
        }
      })
      .state('app.employee.relocation_request_edit', {
        url: '/requested_employee/{id:int}',
        views: {
          'content@': {
            templateUrl: 'views/employee/relocation-request.view.html',
            controller: 'EmployeeRequestController',
            controllerAs: 'vm'
          }
        }
      });
  }
})();
