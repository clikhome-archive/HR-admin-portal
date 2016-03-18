'use strict';

/**
 * @ngdoc directive
 * @name ClikhomeApp.directive:siteMenubarItem
 * @description
 * # siteMenubarItem
 */
angular.module('ClikhomeApp')
  .directive('siteMenubarItem', function () {
    // Controller dependencies
    var DEPS = ['$scope'];

    var controller = function ($scope) {
      $scope.toggleSubmenu = function () {
        $scope.isOpen = !$scope.isOpen;
      };
    };

    DEPS.push(controller);

    var compile = function (element) {
      element.addClass('site-menu-item');
      return link;
    };

    var link = function (scope, element, attrs) {
      if (element.children('.site-menu-sub').length) {
        element.addClass('has-sub');
        element.children('a').append('<span class="site-menu-arrow"></span>');
        scope.hasSubMenu = true;
      } else {
        scope.hasSubMenu = false;
      }

      scope.$watch('isOpen', function (val) {
        if (val) {
          element.addClass('open');
        } else {
          element.removeClass('open');
        }
      });

      element.on('mouseenter', function () {
        element.addClass('hover');
      });
      element.on('mouseleave', function () {
        element.removeClass('hover');
      });
      element.on('click', function () {
        if (scope.hasSubMenu) {
          scope.toggleSubmenu();
        }
      });
    };

    return {
      restrict: 'A',
      require: '^siteMenubar',
      scope: {
        'isOpen': '=?'
      },
      controller: DEPS,
      compile: compile
    };
  });
