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
    var mod = angular.module('cn.xuyuanxiang.message.edit', [
        'ui.router',
        'cn.xuyuanxiang.ui.navbar',
        'cn.xuyuanxiang.model.message',
        'cn.xuyuanxiang.service.uuid',
        'cn.xuyuanxiang.ui.modal'
    ]);

    mod.controller('MessageEditController', [
        '$scope', '$stateParams', 'View', 'navgationStacks', 'Message', 'uuid', '$location',
        'xyxIndicator', 'xyxAlert',
        function ($scope, $stateParams, View, navgationStacks, Message, uuid, $location,
                  xyxIndicator, xyxAlert) {
            navgationStacks.flush(View.initWithLocationUrl("留言"));
            var id = $stateParams.id;
            $scope.isReadonly = !!id;
            $scope.message = new Message(new Firebase(
                "https://xuyuanxiang.firebaseio.com/messages/" + (id ? id : uuid())));

            $scope.doSubmit = function () {
                if ($scope.messageEditForm.$valid) {
                    xyxIndicator.show();
                    $scope.message.$save().then(function (data) {
                        xyxIndicator.hide();
                        xyxAlert.show('感谢您的留言！');
                        $location.url('/message');
                    }).catch(function (error) {
                        xyxIndicator.hide();
                        xyxAlert.show(error.message);
                    });
                }
            }

        }
    ]);

})(angular, Firebase);