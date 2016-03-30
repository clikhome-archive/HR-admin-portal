(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name clikhomeHR.core.LAYOUT_TYPES
   * @description
   * # LAYOUT_TYPES
   * Constant in the ClikhomeApp.
   */

  angular.module('clikhomeHR.core')
         .constant('LAYOUT_TYPES', {
           MENU_COLLAPSED: 'menu-collapsed',
           MENU_COLLAPSED_ALT: 'menu-collapsed-alt',
           MENU_EXPANDED: 'menu-expanded',
           BOXED: 'boxed',
           MENU_FLIPPED: 'menubar-flipped',
           LOGIN: 'login',
           REGISTER: 'register'
         });
})();
