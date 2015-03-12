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
]).controller('ChannelController', ['$scope', '$state', 'View', 'navgationStacks', function ($scope, $state, View, navgationStacks) {
    // 创建代表当前页面的视图
    //  创建方式1: 工厂方法，以当前路由创建视图
    var view1 = View.initWithLocationUrl('首页');
    //  创建方式2：构造方法
    var view2 = new View('首页', '/home');
    // 将视图推入栈
    navgationStacks.push(view1);

    // 其他方法
    //覆盖默认返回按钮
    view2.backBarButton = null;
    // label为空，则显示上一个视图的name
    view2.backBarButton = {
        className: 'icon icon-left-nav',
        label: '返回'
    };
    //左侧按钮组
    view2.leftBarButtonItems = [
        {
            label: '菜单',
            className: 'icon icon-bars',
            clickHandler: function () {
                alert('菜单');
            }
        }
    ];
    //右侧按钮组 同左侧
    view2.rightBarButtonItems = [];

    //居中 分段按钮
    //优先级高于title,
    //通常title显示当前view的name值，
    //若segmentedControls不为空，则显示分段按钮，不再显示title
    view2.segmentedControls = [];
}
]);
