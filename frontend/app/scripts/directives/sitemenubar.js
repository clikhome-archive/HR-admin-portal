'use strict';

/**
 * @ngdoc directive
 * @name ClikhomeApp.directive:siteMenubar
 * @description
 * # siteMenubar
 */
angular.module('ClikhomeApp')
  .directive('siteMenubar', function () {
    // Controller dependencies
    var DEPS = [];

    var controller = function () {};

    DEPS.push(controller);

    var compile = function (element) {
      element.addClass('site-menubar');
      return link;
    };

    var link = function (scope, element) {
    };

    return {
      restrict: 'A',
      controller: DEPS,
      compile: compile
    };
  });
