/**
 *  @name Global Application
 */
var XYX = (function (angular, document) {
    var app = angular.module('cn.xuyuanxiang', [
        'ui.router',
        'LocalStorageModule',
        'cn.xuyuanxiang.home',
        'cn.xuyuanxiang.channel',
        'cn.xuyuanxiang.user',
        'cn.xuyuanxiang.message'
    ]);

    app.init = function () {
        angular.bootstrap(document, ['cn.xuyuanxiang']);
    };

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

    return app;
})(angular, document);