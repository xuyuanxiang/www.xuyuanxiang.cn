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
    var mod = angular.module('cn.xuyuanxiang.channel', [
        'ui.router',
        'cn.xuyuanxiang.ui.navbar',
        'cn.xuyuanxiang.channel.edit'
    ]);

    mod.config(['$stateProvider',
        function ($stateProvider) {

            $stateProvider.state('channel', {
                url: '/channel',
                templateUrl: 'channel/channel.tpl.html',
                controller: 'ChannelController'
            }).state('editChannel', {
                url: '/channel/edit/:id',
                templateUrl: 'channel/edit/channel_edit.tpl.html',
                controller: 'ChannelEditController'
            }).state('createChannel', {
                url: '/channel/edit',
                templateUrl: 'channel/edit/channel_edit.tpl.html',
                controller: 'ChannelEditController'
            });

        }
    ]);

    mod.controller('ChannelController', ['$scope', '$state', 'View', 'navgationStacks',
        function ($scope, $state, View, navgationStacks) {

        }
    ]);

})(angular);