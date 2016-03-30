(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name clikhomeHR.core.directive:siteMenubarItem
   * @description
   * # siteMenubarItem
   */
  angular.module('clikhomeHR.core')
         .directive('siteMenubarItem', siteMenubarItem);

  function siteMenubarItem() {
    controller.$inject = ['$scope'];

    var directive = {
      restrict: 'A',
      require: '^siteMenubar',
      scope: {
        'isOpen': '=?'
      },
      controller: controller,
      compile: compile
    };
    return directive;

    function controller($scope) {
      $scope.toggleSubmenu = function() {
        $scope.isOpen = !$scope.isOpen;
      };
    }

    function compile(element) {
      element.addClass('site-menu-item');
      return link;
    }

    function link(scope, element) {
      if (element.children('.site-menu-sub').length) {
        element.addClass('has-sub');
        element.children('a').append('<span class="site-menu-arrow"></span>');
        scope.hasSubMenu = true;
      } else {
        scope.hasSubMenu = false;
      }

      scope.$watch('isOpen', function(val) {
        if (val) {
          element.addClass('open');
        } else {
          element.removeClass('open');
        }
      });

      element.on('mouseenter', function() {
        element.addClass('hover');
      });
      element.on('mouseleave', function() {
        element.removeClass('hover');
      });
      element.on('click', function() {
        if (scope.hasSubMenu) {
          scope.toggleSubmenu();
        }
      });
    }
  }
})();
