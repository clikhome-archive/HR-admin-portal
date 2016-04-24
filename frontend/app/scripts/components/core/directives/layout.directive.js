(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name clikhomeHR.core.directive:layout
   * @description
   * # layout
   */
  angular.module('clikhomeHR.core')
         .directive('layout', layout);

  layout.$inject = ['$rootScope', 'LAYOUT_TYPES'];

  function layout($rootScope, LAYOUT_TYPES) {
    var TYPE_CLASS_MAP = {};
    TYPE_CLASS_MAP[LAYOUT_TYPES.DEFAULT] = 'default';
    TYPE_CLASS_MAP[LAYOUT_TYPES.MENU_COLLAPSED] = 'site-menubar-fold';
    TYPE_CLASS_MAP[LAYOUT_TYPES.MENU_COLLAPSED_ALT] = 'site-menubar-fold-alt site-menubar-fold';
    TYPE_CLASS_MAP[LAYOUT_TYPES.MENU_EXPANDED] = 'site-menubar-unfold';
    TYPE_CLASS_MAP[LAYOUT_TYPES.BOXED] = 'layout-boxed';
    TYPE_CLASS_MAP[LAYOUT_TYPES.MENU_FLIPPED] = 'site-menubar-flipped';
    TYPE_CLASS_MAP[LAYOUT_TYPES.AUTH] = 'page-login page-dark layout-full';

    var directive = {
      restrict: 'A',
      link: link
    };
    return directive;

    function link() {
      var $body = $('body');
      var activeType = '';
      var layout = function(type) {
        if (type !== activeType && TYPE_CLASS_MAP[type]) {
          $body.removeClass(TYPE_CLASS_MAP[activeType]);
          $body.addClass(TYPE_CLASS_MAP[type]);
          activeType = type;
        }
      };
      var toggleMenu = function(isOpen) {
        if (isOpen) {
          $body.removeClass(TYPE_CLASS_MAP[LAYOUT_TYPES.MENU_COLLAPSED]);
          $body.addClass(TYPE_CLASS_MAP[LAYOUT_TYPES.MENU_EXPANDED]);
        } else {
          $body.removeClass(TYPE_CLASS_MAP[LAYOUT_TYPES.MENU_EXPANDED]);
          $body.addClass(TYPE_CLASS_MAP[LAYOUT_TYPES.MENU_COLLAPSED]);
        }
      };
      $rootScope.$on('layout-switcher:layout', function(evt, type) {
        layout(type);
      });
      $rootScope.$on('layout-switcher:toggleMenu', function(evt, isOpen) {
        toggleMenu(isOpen);
      });
      $body.addClass('site-menubar-native');
    }
  }
})();
