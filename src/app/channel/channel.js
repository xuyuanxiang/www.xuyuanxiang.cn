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
angular.module('cn.xuyuanxiang.channel', [
    'ui.router',
    'cn.xuyuanxiang.ui.navbar',
    'cn.xuyuanxiang.channel.edit',
    'cn.xuyuanxiang.channel.resource'
]).config(['$stateProvider',
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
]).controller('ChannelController', ['$scope', '$state', 'View', 'navgationStacks',
    function ($scope, $state, View, navgationStacks) {

    }
]).controller('DemoController', ['$scope', 'xyxModal', 'xyxAlert', 'xyxConfirm', 'xyxIndicator'
    , function ($scope, xyxModal, xyxAlert, xyxConfirm, xyxIndicator) {

        //可定制模态框
        xyxModal.show({
            overlay: true,//是否显示遮罩
            closeable: false, //是否可关闭
            innerHtml: "",// 自定义html代码
            title: "提示", // 标题
            text: "", // 信息
            buttons: [{ // 底部按钮组
                label: "确定",
                handler: null,
                bold: true
            }]
        });

        //弹出框
        xyxAlert.show('Alert', function () {
            alert('click');
        });

        //对话框
        xyxConfirm.show('确定删除？', function () {
            alert('确定');
        }, function () {
            alert('取消');
        });

        // 压力指示计
        //默认
        xyxIndicator.show();
        //自定义文字信息
        xyxIndicator.show('正在加载，请稍后。。。');


    }
]);
