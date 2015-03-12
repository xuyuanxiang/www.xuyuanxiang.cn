/**
 * @overview
 *
 * @version
 * @author xuyuanxiang
 * @date 15/3/8
 * ------------------
 * @overview
 * @version
 * @modifier
 * @date
 * ------------------
 */
(function (angular) {
    var mod = angular.module('cn.xuyuanxiang.user', [
        'ui.router',
        'cn.xuyuanxiang.user.register',
        'cn.xuyuanxiang.user.login'
    ]);

    mod.config(['$stateProvider',
        function ($stateProvider) {

            $stateProvider.state('用户', {
                url: '/user',
                templateUrl: 'user/user.tpl.html',
                controller: 'UserController'
            }).state('用户.注册', {
                url: '/register',
                templateUrl: 'user/user_register.tpl.html',
                controller: 'RegisterController'
            });
        }
    ]);

    mod.controller('UserController', ['$scope', function ($scope) {

    }]);
})(angular);