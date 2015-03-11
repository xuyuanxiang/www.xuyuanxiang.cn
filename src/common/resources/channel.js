/**
 * @overview
 *
 * @version
 * @author xuyuanxiang
 * @date 15/3/7
 * ------------------
 * @overview
 * @version
 * @modifier
 * @date
 * ------------------
 */
(function (angular) {
    var mod = angular.module('cn.xuyuanxiang.model.channel', ['firebase']);

    mod.factory('Channel', ['$firebaseObject', function ($firebaseObject) {
        return $firebaseObject.$extend({});
    }]);
})(angular);