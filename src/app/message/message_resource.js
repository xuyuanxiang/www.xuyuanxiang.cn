/**
 * @overview
 *
 * @version
 * @author xuyuanxiang
 * @date 15/3/10
 * ------------------
 * @overview
 * @version
 * @modifier
 * @date
 * ------------------
 */
(function (angular) {
    var mod = angular.module('cn.xuyuanxiang.message.resource', ['firebase']);

    mod.factory('Message', ['$firebaseObject', function ($firebaseObject) {
        return $firebaseObject.$extend({});
    }]);

    mod.factory('Messages', ['$firebaseArray', function ($firebaseArray) {
        return $firebaseArray.$extend({});
    }]);
})(angular);