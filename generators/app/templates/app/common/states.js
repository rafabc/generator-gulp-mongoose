/*global states */

(function (states) {
    'use strict';

    states[states.length] = {
        'name': 'testAbs',
        'url': '',
        'abstract': true,
        'templateUrl': 'commons/html/testAbs.html',
        'controller': 'testCtrl',
        'dictionary': 'commons/i18n/messages.json'
    };
}(states));