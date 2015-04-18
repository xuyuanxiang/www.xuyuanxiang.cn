/**
 * @ngdoc
 * @name cn.xuyuanxiang.home
 * @description
 * 主页模块
 * @author xuyuanxiang
 * @date 15/4/17
 */
(function (angular) {
    var mod = angular.module('cn.xuyuanxiang.home', [
        'ui.router'
    ]);

    mod.config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider.state('home', {
                url: '/home',
                templateUrl: 'app/home/home.tpl.html',
                controller: 'HomeController'
            });
        }
    ]);

    mod.controller('HomeController', [
        '$scope', '$location',
        function ($scope, $location) {
            $scope.doLogin = function () {
                if ($scope.signInForm.$valid) {
                    alert('login');
                }
            }
        }
    ]);
})(angular);