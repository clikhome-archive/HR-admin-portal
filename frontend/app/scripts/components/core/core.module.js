(function() {
  'use strict';

  angular.module('clikhomeHR.core', [
    /* External (Angular) */
    'ngCookies',
    'ngResource',
    'ngSanitize',

    /* External (3rd party) */
    'ui.router',
    'ui.bootstrap',
    'mwl.confirm',
    'ngPassword',
    'dialogs.main',
    'dialogs.default-translations',
    'ui.autocomplete',
    'vsGoogleAutocomplete',

    /* Internal */
    'clikhomeHR.const',
    'clikhomeHR.auth',
    'clikhomeHR.billing',
    'clikhomeHR.dashboard',
    'clikhomeHR.employee',
    'clikhomeHR.profile',
    'clikhomeHR.relocation',
    'clikhomeHR.support'
  ]);
})();
