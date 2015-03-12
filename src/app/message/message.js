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
(function (angular, Firebase) {
    var mod = angular.module('cn.xuyuanxiang.message', [
        'ui.router',
        'cn.xuyuanxiang.message.edit',
        'cn.xuyuanxiang.message.resource',
        'cn.xuyuanxiang.ui.navbar',
        'cn.xuyuanxiang.ui.modal'
    ]);

    mod.controller('MessageController', ['$scope', 'Messages', 'View', 'navgationStacks', '$location',
        'xyxIndicator', 'xyxAlert',
        function ($scope, Messages, View, navgationStacks, $location, xyxIndicator, xyxAlert) {
            //var view = new View('在线留言', '/message');
            //view.rightBarButtonItems = [
            //    {
            //        label: '留言',
            //        className: 'icon-edit',
            //        clickHandler: function () {
            //            $location.url('/message/edit')
            //        }
            //    }
            //];
            //navgationStacks.flush(view);
            xyxIndicator.show();
            $scope.messages = new Messages(new Firebase('https://xuyuanxiang.firebaseio.com/messages'));

            $scope.messages.$loaded().then(function (data) {
                xyxIndicator.hide();
            }).catch(function (error) {
                xyxIndicator.hide();
                xyxAlert.show(error.message);
            });

        }
    ]);

    mod.config(['$stateProvider',
        function ($stateProvider) {

            $stateProvider.state('message', {
                url: '/message',
                templateUrl: 'message/message.tpl.html',
                controller: 'MessageController'
            }).state('editMessage', {
                url: '/message/edit/:id',
                templateUrl: 'message/message_edit.tpl.html',
                controller: 'MessageEditController'
            }).state('createMessage', {
                url: '/message/edit',
                templateUrl: 'message/message_edit.tpl.html',
                controller: 'MessageEditController'
            });
        }
    ]);
})(angular, Firebase);