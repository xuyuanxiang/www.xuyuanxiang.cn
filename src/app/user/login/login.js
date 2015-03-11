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
    var mod = angular.module('cn.xuyuanxiang.user.login', [
        'cn.xuyuanxiang.ui.navbar',
        'cn.xuyuanxiang.model.user',
        'LocalStorageModule',
        'firebase'
    ]);
    mod.controller('LoginController', [
        '$scope', '$firebaseAuth', 'View', 'navgationStacks', 'User', 'localStorageService',
        function ($scope, $firebaseAuth, View, navgationStacks, User, localStorageService) {
            navgationStacks.flush(View.initWithLocationUrl('注册'));

            $scope.doLogin = function () {
                if ($scope.registerForm.$valid) {
                    //var url = 'https://xuyuanxiang.firebaseio.com/users/' + $scope.username;
                    //var user = new User(new Firebase(url));
                    //user.$loaded().then(function (data) {
                    //    if (data && data.password && data.schema) {
                    //        localStorageService.set()
                    //    } else {
                    //        alert('用户名或密码输入错误！');
                    //    }
                    //});

                }
            }
        }
    ]);
})(angular);