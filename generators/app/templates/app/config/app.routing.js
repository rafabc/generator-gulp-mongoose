(function () {
  'use strict';

  angular.module('app')
    .config(router);

  router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function router($stateProvider, $urlRouterProvider, $locationProvider) {
    //$locationProvider.html5Mode({
    //  enabled: true
    //});
    // https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-configure-your-server-to-work-with-html5mode

    //$urlRouterProvider.otherwise('/');
    $urlRouterProvider.otherwise(function ($injector, $location) {
      if ($location.$$url !== '') return '/404';
      return '/';
    });

    $stateProvider

      .state('index', {
        url    : '/',
        resolve: {isLoged: isLoged},
        access : '0001',
        views  : {
          '@': {
            'templateUrl': 'login/app-login.html'
          }
        }
      })

      .state('home', {
        url    : '/home',
        resolve: {authenticate: authFunction},
        access : '0001',
        views  : {
          '@'          : {
            templateUrl: 'home/home.html'
          },
          'footer@home': {templateUrl: 'components/footer/footer.html'}
        }
      })

      .state('alta', {
        url    : '/alta',
        resolve: {authenticate: authFunction},
        access : '0001',
        views  : {
          '@'          : {
            templateUrl: 'incidencia/alta/app-alta.html'
          },
          'header@alta': {
            templateUrl: 'components/header/app-header.html',
            data       : {headerLink: 'alta'}
          },
          'footer@alta': {templateUrl: 'components/footer/footer.html'}
        }
      })

      .state('busquedas', {
        url    : '/busquedas',
        resolve: {authenticate: authFunction},
        access : '0001',
        views  : {
          '@'                 : {
            templateUrl: 'incidencia/busquedas/busquedas.html'
          },
          'header@busquedas': {templateUrl: 'components/header/app-header.html'},
          'footer@busquedas': {templateUrl: 'components/footer/footer.html'}
        }
      })
      
      .state('error-404', {
        url    : '/404',
        resolve: {authenticate: authFunction},
        access : '0001',
        views  : {
          '@'               : {
            templateUrl: 'errores/app-error-404.html'
          },
          'header@error-404': {templateUrl: 'components/header/app-header.html'},
          'footer@error-404': {templateUrl: 'components/footer/footer.html'}
        }
      })

      .state('error-500', {
        url    : '/500',
        resolve: {authenticate: authFunction},
        access : '0001',
        views  : {
          '@'               : {
            templateUrl: 'errores/app-error-500.html'
          },
          'header@error-500': {templateUrl: 'components/header/app-header.html'},
          'footer@error-500': {templateUrl: 'components/footer/footer.html'}
        }
      });

    authFunction.$inject = ['authService', '$state'];
    function authFunction(authService, $state) {
      return authService.hasAccess($state.next.access);
    }

    isLoged.$inject = ['authService', '$state', '$log'];
    function isLoged(authService, $state, $log) {
      authService.hasAccess($state.next.access)
        .then(function () {
          $state.go('home');
        });
    }
  }

  angular.module('app')
    .value('historyLog', [null, null, null, null, null]);

  angular.module('app')
    .run(['$rootScope', '$state', 'historyLog',
      function ($rootScope, $state, historyLog) {
        $rootScope.$on('$stateChangeError',
          function (event, toState, toParams, fromState, fromParams, error) {
            event.preventDefault();
            $state.go('index');
          });

        $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
          historyLog.push(from.name || null);
          historyLog.shift();
        });

      }]);
})();