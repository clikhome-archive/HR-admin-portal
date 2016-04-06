(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name clikhomeHR.const.LAYOUT_TYPES
   * @description
   * # LAYOUT_TYPES
   * Constant in the clikhomeHR.
   */

  angular.module('clikhomeHR.const')
         .constant('LAYOUT_TYPES', {
           DEFAULT: 'default',
           MENU_COLLAPSED: 'menu-collapsed',
           MENU_COLLAPSED_ALT: 'menu-collapsed-alt',
           MENU_EXPANDED: 'menu-expanded',
           BOXED: 'boxed',
           MENU_FLIPPED: 'menubar-flipped',
           AUTH: 'auth'
         });
})();
