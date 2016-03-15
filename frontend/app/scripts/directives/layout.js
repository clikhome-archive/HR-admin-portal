'use strict';

/**
 * @ngdoc directive
 * @name ClikhomeApp.directive:layout
 * @description
 * # layout
 */
angular.module('ClikhomeApp')
  .directive('layout', ['$rootScope', 'LAYOUT_TYPES', function ( $rootScope, LAYOUT_TYPES ) {
    var TYPE_CLASS_MAP = {};
    TYPE_CLASS_MAP[LAYOUT_TYPES.MENU_COLLAPSED] = 'site-menubar-keep site-menubar-fold';
    TYPE_CLASS_MAP[LAYOUT_TYPES.MENU_COLLAPSED_ALT] = 'site-menubar-fold-alt site-menubar-keep site-menubar-fold';
    TYPE_CLASS_MAP[LAYOUT_TYPES.MENU_EXPANDED] = 'site-menubar-keep site-menubar-unfold';
    TYPE_CLASS_MAP[LAYOUT_TYPES.BOXED] = 'layout-boxed site-menubar-unfold';
    TYPE_CLASS_MAP[LAYOUT_TYPES.MENU_FLIPPED] = 'site-menubar-flipped site-menubar-unfold';
    TYPE_CLASS_MAP[LAYOUT_TYPES.LOGIN] = 'page-login layout-full';
    TYPE_CLASS_MAP[LAYOUT_TYPES.REGISTER] = 'page-register-v3 layout-full';

    return {
      restrict: 'A',
      link: function postLink( scope, element, attrs ) {
        var $body = $('body');
        var activeType = '';
        var layout = function ( type ) {
          if ( type !== activeType && TYPE_CLASS_MAP[type] ) {
            $body.removeClass(TYPE_CLASS_MAP[activeType]);
            $body.addClass(TYPE_CLASS_MAP[type]);
            activeType = type;
          }
        };
        $rootScope.$on('layout-switcher:layout', function ( evt, type ) {
          layout(type);
        });
        layout(LAYOUT_TYPES.MENU_EXPANDED);
      }
    };
  }]);
