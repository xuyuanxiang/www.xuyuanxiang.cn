/**
 *  @name Global Application
 */
(function (angular, document) {
    var app = angular.module('cn.xuyuanxiang', [
        'ngAnimate',
        'ngSanitize',
        'ui.router',
        'LocalStorageModule',
        'cn.xuyuanxiang.home',
        'cn.xuyuanxiang.register'
    ]);

    app.config(['localStorageServiceProvider',
        function (localStorageServiceProvider) {
            //设置离线存储 key 的前缀
            localStorageServiceProvider.setPrefix('cn.xuyuanxiang');
        }
    ]);

    app.config(['$urlRouterProvider',
        function ($urlRouterProvider) {
            $urlRouterProvider.otherwise('/home');
        }
    ]);

    app.controller('RootController', ['$rootScope',
        function ($rootScope) {

        }
    ]);

})(angular, document);