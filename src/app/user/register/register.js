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
    var mod = angular.module('cn.xuyuanxiang.user.register', [
        'cn.xuyuanxiang.ui.navbar',
        'cn.xuyuanxiang.model.user'
    ]);
    mod.controller('RegisterController', [
        '$scope', 'View', 'navgationStacks', 'User', '$firebaseAuth',
        function ($scope, View, navgationStacks, User, $firebaseAuth) {
            navgationStacks.flush(View.initWithLocationUrl('注册'));


            $scope.doRegister = function () {
                if ($scope.registerForm.$valid) {
                    //var url = 'https://xuyuanxiang.firebaseio.com/users/' + $scope.username;
                    //var user = new User(new Firebase(url));
                    //
                    //user.$loaded().then(function (data) {
                    //    if (data && data.password && data.schema) {
                    //        alert('用户名已存在！');
                    //    } else {
                    //        user.password = $scope.password;
                    //        user.schema = url;
                    //        user.$save().then(function (data) {
                    //            console.log(data);
                    //        });
                    //    }
                    //});
                    var ref = new Firebase("https://xuyuanxiang.firebaseio.com");
                    var authObj = $firebaseAuth(ref);
                    authObj.$createUser({
                        email: $scope.email,
                        password: $scope.password
                    }).then(function (userData) {
                        return authObj.$authWithPassword({
                            email: $scope.email,
                            password: $scope.password
                        });
                    }).then(function (authData) {
                        console.log(authData);
                        console.log("Logged in as:", authData.uid);
                    }).catch(function (error) {
                        console.error("Error: ", error);
                    });

                }
            }
        }
    ]);
})(angular);