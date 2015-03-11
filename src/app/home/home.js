/**
 * @overview
 *
 * @version
 * @author xuyuanxiang
 * @date 15/3/5
 * ------------------
 * @overview
 * @version
 * @modifier
 * @date
 * ------------------
 */
(function (angular) {
    var mod = angular.module('cn.xuyuanxiang.home', [
        'ui.router',
        'cn.xuyuanxiang.ui.navbar'
    ]);

    mod.config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider.state('home', {
                url: '/home',
                templateUrl: 'home/home.tpl.html',
                controller: 'HomeController'
            });
        }
    ]);

    mod.controller('HomeController', [
        '$scope', '$location', 'View', 'navgationStacks',
        function ($scope, $location, View, navgationStacks) {
            var homeView = View.initWithLocationUrl('首页');
            homeView.rightBarButtonItems = [
                {
                    label: '注册',
                    clickHandler: function () {
                        $location.url('/user/register');
                    }
                }
            ];
            navgationStacks.flush(homeView);
        }
    ]);
})(angular);