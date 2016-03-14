'use strict';

/**
 * @ngdoc service
 * @name ClikhomeApp.layoutSwitcher
 * @description
 * # layoutSwitcher
 * Factory in the ClikhomeApp.
 */
angular.module('ClikhomeApp')
  .factory('layoutSwitcher', function ( $rootScope, LAYOUT_TYPES ) {
    var EVENT_NAME = 'layout-switcher:layout';

    return {
      LAYOUT_TYPES: LAYOUT_TYPES,
      layout: function ( type ) {
        if ( angular.isUndefined(type) ) {
          console.warn('Invalid layout type undefined');
          return false;
        }
        this.selected = type;
        $rootScope.$emit(EVENT_NAME, type);
      }
    };
  });
