/**
 * @ngdoc
 * @name cn.xuyuanxiang.register
 * @description
 *  注册模块
 * @author xuyuanxiang
 * @date 15/4/18
 */
angular.module('cn.xuyuanxiang.register', ['ui.router'])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider.state('register', {
                url: '/register',
                templateUrl: 'app/register/register.tpl.html',
                controller: 'RegisterController'
            });
        }
    ])
    .controller('RegisterController', ['$scope', function ($scope) {
        $scope.doRegister = function () {
            if ($scope.registerForm.$valid) {
                alert('register');
            }
        }
    }]);