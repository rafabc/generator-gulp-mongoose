(function () {
  'use strict';

  angular.module('ptiApp')
    .config(['tmhDynamicLocaleProvider', function (tmhDynamicLocaleProvider) {
      tmhDynamicLocaleProvider.localeLocationPattern('/public/vendor/i18n/angular-locale_{{locale}}.js');

    }]);

})();