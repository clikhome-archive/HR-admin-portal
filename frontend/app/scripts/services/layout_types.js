'use strict';

/**
 * @ngdoc service
 * @name ClikhomeApp.LAYOUTTYPES
 * @description
 * # LAYOUTTYPES
 * Constant in the ClikhomeApp.
 */
angular.module('ClikhomeApp')
  .constant('LAYOUT_TYPES', {
    MENU_COLLAPSED: 'menu-collapsed',
    MENU_COLLAPSED_ALT: 'menu-collapsed-alt',
    MENU_EXPANDED: 'menu-expanded',
    BOXED: 'boxed',
    MENU_FLIPPED: 'menubar-flipped',
    LOGIN: 'login',
    REGISTER: 'register'
  });
