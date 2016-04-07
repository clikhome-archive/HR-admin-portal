(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name clikhomeHR.core.layoutSwitcher
   * @description
   * # layoutSwitcher
   * Allows to switch between `layouts` (various types of app styles)
   */
  angular.module('clikhomeHR.core')
         .provider('layoutSwitcher', layoutSwitcherProvider);

  layoutSwitcherProvider.$inject = ['LAYOUT_TYPES'];

  function layoutSwitcherProvider(LAYOUT_TYPES) {
    var defaultLayout = LAYOUT_TYPES.DEFAULT;
    this.setDefault = setDefault;
    this.$get = layoutSwitcher;

    function setDefault(type) {
      var defined = false;
      for (var k in LAYOUT_TYPES) {
        if (LAYOUT_TYPES.hasOwnProperty(k) && LAYOUT_TYPES[k] === type) {
          defined = true;
        }
      }
      if (defined) {
        defaultLayout = type;
      } else {
        console.warn('layoutSwitcherProvider: undefined layout type \'%s\'', type);
      }
    }

    layoutSwitcher.$inject = ['$rootScope', 'LAYOUT_TYPES'];

    /* layoutSwitcherFactory */
    function layoutSwitcher($rootScope, LAYOUT_TYPES) {
      var LAYOUT_EVENT = 'layout-switcher:layout';
      var MENU_EVENT = 'layout-switcher:toggleMenu';
      var MENU_MOBILE_EVENT = 'layout-switcher:toggleMenuMobile';

      var service = {
        LAYOUT_TYPES: LAYOUT_TYPES,
        selected: '',
        menuExpanded: false,
        menuMobileExpanded: false,
        run: run,
        layout: layout,
        toggleMenu: toggleMenu,
        toggleMenuMobile: toggleMenuMobile
      };

      // call this in run of module to listen for state changes
      function run() {
        $rootScope.$on('$stateChangeSuccess', function(e, toState) {
          var l = defaultLayout;
          if (angular.isDefined(toState.data) && toState.data.layout) {
            l = toState.data.layout;
          }
          if (l !== service.selected) {
            layout(l);
          }
        });
      }

      // change layout type and tell directive to apply class
      function layout(type) {
        if (angular.isUndefined(type)) {
          console.warn('Invalid layout type undefined');
          return false;
        }
        service.selected = type;
        $rootScope.$emit(LAYOUT_EVENT, type);
      }

      function toggleMenu() {
        service.menuExpanded = !service.menuExpanded;
        $rootScope.$emit(MENU_EVENT, service.menuExpanded);
      }

      function toggleMenuMobile() {
        service.menuMobileExpanded = !service.menuMobileExpanded;
        $rootScope.$emit(MENU_MOBILE_EVENT, service.menuExpanded);
      }

      return service;
    }
  }
})();
