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
    var mod = angular.module('cn.xuyuanxiang.user.resource', ['firebase']);

    mod.factory('User', ['$firebaseObject', function ($firebaseObject) {
        return $firebaseObject.$extend({});
    }]);

    mod.factory('Users', ['$firebaseArray', function ($firebaseArray) {
        return $firebaseArray.$extend({});
    }]);
})(angular);