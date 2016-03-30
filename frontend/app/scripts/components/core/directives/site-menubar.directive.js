(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name clikhomeHR.core.directive:siteMenubar
   * @description
   * # siteMenubar
   */
  angular.module('clikhomeHR.core')
         .directive('siteMenubar', siteMenubar);

  siteMenubar.$inject = [];

  function siteMenubar() {
    controller.$inject = [];

    var directive = {
      restrict: 'A',
      controller: controller,
      compile: compile
    };
    return directive;

    function controller() {
    }

    function compile(element) {
      element.addClass('site-menubar');
      return link;
    }

    function link() {
    }
  }
})();
