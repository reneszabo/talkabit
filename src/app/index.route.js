(function () {
  'use strict';

  angular
          .module('4pixelsTalkabit')
          .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
            .state('popular', {
              url: '/popular',
              views: {
                'body': {
                  templateUrl: 'app/views/popular/popular.html',
                  controller: 'PopularController',
                  controllerAs: 'popular'
                },
                'footer': {
                  templateUrl: 'app/views/commons/footer.html'
                }
              }
            })
            .state('record', {
              url: '/record',
              views: {
                'body': {
                  templateUrl: 'app/views/record/record.html',
                  controller: 'RecordController',
                  controllerAs: 'record'
                },
                'footer': {
                  templateUrl: 'app/views/record/footer.html'
                }
              }

            })
            .state('login', {
              url: '/login',
              views: {
                'body': {
                  templateUrl: 'app/views/login/login.html',
                  controller: 'LoginController',
                  controllerAs: 'login'
                }
              }
            })

            ;
//            .state('home', {
//              url: '/',
//              templateUrl: 'app/main/main.html',
//              controller: 'MainController',
//              controllerAs: 'main'
//            });

    $urlRouterProvider.otherwise('/popular');
  }

})();
