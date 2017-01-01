/** @module ptiApp
 *  @description Se define el modulo principal y las dependencias que pueden ser
 *  importadas con CommonJS
 *  @requires ptiApp/auth
 */


require('../bower_components/lodash/lodash.js');
require('../bower_components/angular/angular');
require('../bower_components/angular-ui-router/release/angular-ui-router');
require('../bower_components/angular-translate/dist/angular-translate.js');
require('../bower_components/angular-ui-bootstrap/dist/ui-bootstrap.js');

(function () {
  'use strict';

  angular.module('app', [
    'ui.router',
    'ui.bootstrap'
  ]);

})();

require('./configuracion');
require('./components');