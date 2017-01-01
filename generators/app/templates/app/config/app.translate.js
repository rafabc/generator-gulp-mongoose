(function () {
  'use strict';

  angular.module('app')
    .config(translate);

  translate.$inject = ['$translateProvider'];

  function translate($translateProvider) {
    $translateProvider.translations('es', esEs);
    //$translateProvider.translations('ca', ca);
    //$translateProvider.translations('en', enGB);

    $translateProvider.preferredLanguage('es');

    $translateProvider.useSanitizeValueStrategy('escape');

    $translateProvider.forceAsyncReload(true);
  }

  var esEs = require('./i18n/es-ES');
 // var ca   = require('./i18n/ca');
  //var enGB = require('./i18n/en-GB');

})();