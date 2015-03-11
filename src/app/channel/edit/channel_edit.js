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
    var mod = angular.module('cn.xuyuanxiang.channel.edit', [
        'ui.router'

    ]);

    mod.controller('ChannelEditController', ['$scope', '$stateParams', function ($scope, $stateParams) {
        var id = $stateParams.id;
    }]);

})(angular);