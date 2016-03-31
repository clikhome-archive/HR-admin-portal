(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name clikhomeHR.core.layoutSwitcher
   * @description
   * # layoutSwitcher
   */
  angular.module('clikhomeHR.core')
         .factory('layoutSwitcher', layoutSwitcher);

  layoutSwitcher.$inject = ['$rootScope', 'LAYOUT_TYPES'];

  function layoutSwitcher($rootScope, LAYOUT_TYPES) {
    var LAYOUT_EVENT = 'layout-switcher:layout';
    var MENU_EVENT = 'layout-switcher:toggleMenu';
    var MENU_MOBILE_EVENT = 'layout-switcher:toggleMenuMobile';

    var service = {
      LAYOUT_TYPES: LAYOUT_TYPES,
      menuExpanded: false,
      menuMobileExpanded: false,
      layout: function(type) {
        if (angular.isUndefined(type)) {
          console.warn('Invalid layout type undefined');
          return false;
        }
        service.selected = type;
        $rootScope.$emit(LAYOUT_EVENT, type);
      },
      toggleMenu: function() {
        service.menuExpanded = !service.menuExpanded;
        $rootScope.$emit(MENU_EVENT, service.menuExpanded);
      },
      toggleMenuMobile: function() {
        service.menuMobileExpanded = !service.menuMobileExpanded;
        $rootScope.$emit(MENU_MOBILE_EVENT, service.menuExpanded);
      }
    };
    service.toggleMenu();

    return service;
  }
})();