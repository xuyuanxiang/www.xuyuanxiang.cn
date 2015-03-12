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
angular.module('cn.xuyuanxiang.channel.resource', [
    'firebase'
]).factory('Channel', ['$firebaseObject',
    function ($firebaseObject) {
        return $firebaseObject.$extend({});
    }
]);