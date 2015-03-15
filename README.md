#个人/企业网站

**Demo** [www.xuyuanxiang.cn](http://www.xuyuanxiang.cn)

## 目录

1. [简介](#intro)

2. [运行](#run)

3. [开发](#dev)

 3.1 [Resource(Model)](#res)

 3.2 [UI](#ui)

4. [测试](#test)

 4.1 [Unit test](#unit)

 4.2 [End to end test](#e2e)

## <a id="intro" name="intro">简介</a>
+ CMS内容管理，完全采用Html、CSS、JavaScript架构，支持数据库动态内容创建。
+ 用户模块、栏目模块、新闻模块、产品模块、招聘模块、留言模块... 可插拔模块化开发，按需载入。
+ 适用于初创型企业及个人门户网站，最低只需**年租25元**的低配服务器云空间即可部署。

前端UI框架：[Ratchet](http://goratchet.com/)

JS框架：[AngularJS](http://angularjs.org/)

*`静态资源`CDN加速由[七牛存储](http://www.qiniu.com/)提供。*

*`数据存储`由[Firebase](https://www.firebase.com)提供。*

## <a id="run" name="run">运行</a>
项目采用Grunt构建，使用Bower解决项目依赖。


## <a id="dev" name="dev">开发</a>

### <a id="res" name="res">Resource使用示例 (Model&Collection)</a>

默认使用[angularfire](https://github.com/firebase/angularfire) 与FireBase进行数据交互。

如需与后台服务器端交互，可继承src/app/common/resource.js下的XYXModel和XYXCollection基类。

具体api请求路径可在src/app/common/request_api.js内集中维护。

例如，在request_api.js中有如下请求路径：

```javascript
channel: {
    getByConditions: baseUrl + 'cms/channel/jsonp/getByConditions',
    getById: baseUrl + 'cms/channel/jsonp/getById'
}
```

可以按如下方式分别创建 **Channel** 以及 **ChannelCollection** 两个服务，用于与服务器端进行数据交互

```javascript

    angular.module('myApp', ['cn.xuyuanxiang.resource'])
        .factory('Channel', ['XYXModel', function(XYXModel){
            return XYXModel.xyxExtend({
                getById : function(id){
                    return this.request('channel', 'getById', {id:id});
                }
            });
        }])
        .factory('ChannelCollection', ['XYXCollection', function(XYXCollection){
            return XYXCollection.xyxExtend({
                getByConditions : function(name, parentId){
                    return this.request('channel', 'getByConditions', {name : '', parentId : ''....});
                }
            });
        }])
        .controller('DemoController',['$scope', 'Channel', 'ChannelCollection',
            function($scope, Channel, ChannelCollection){
                $scope.channel = new Channel();
                $scope.channel.getById('1');
                $scope.channels = new ChannelCollection();
                $scope.channels.getByConditions('首页', '');
            }
        ]);

```

**模板视图**

```html

<h1>{{channel.name}}</h1>

<ul>
    <li ng-repeat="item in channels">
        {{item.name}}
    </li>
</ul>

```

### <a id="ui" name="ui">UI</a>

#### 导航栈使用示例（Navbar）

用于维护顶部导航栏的状态

```javascript

    angular.module('myApp', ['cn.xuyuanxiang.ui.navbar'])
        .controller('DemoController', ['$scope', 'View', 'navgationStacks',
            function($scope, View, navgationStacks){
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

```

#### 模态框使用示例（Modal）

```javascript

    angular.module('myApp', ['cn.xuyuanxiang.ui.modal'])

    .controller('DemoController', ['$scope', 'xyxModal', 'xyxAlert', 'xyxConfirm', 'xyxIndicator'
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

```

#### 无限向下滚动加载（Infinite scroll）&向下滑动刷新（Pull to refresh）


```javascript

    angular.module('myApp', [
        'cn.xuyuanxiang.ui.infiniteScroll',
        'cn.xuyuanxiang.ui.pullToRefresh'
    ]);

```

```html

    <div xyx-pull-to-refresh="refresh()"></div>

    <!-- infinite scroll 原理是监听scroll事件，即onscroll调用的方法 -->
    <!-- 需要元素本身高度确定时才能触发响应，下面两种情况皆可触发 -->
    <div style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;overflow: hidden;">
        <div style="width: 100%;height: 100%;" xyx-infinite-scroll="nextPage()"></div>
    </div>
    <div style="height: 400px;" xyx-infinite-scroll="nextPage()"></div>

```

#### 传送带／轮播（slider)

```javascript

    angular.module('myApp', ['cn.xuyuanxiang.ui.slider']);

```

```html

    <xyx-slider auto="true" delay="4000" pagination="true" class="row">

        <xyx-slider-item ng-repeat="ad in advertisements">

            <img class="img-responsive" style="min-width: 100%" ng-src="{{ad}}"/>

            <xyx-slider-item-caption>
                <h1>字幕</h1>
            </xyx-slider-item-caption>

        </xyx-slider-item>

    </xyx-slider>

```

#### 通知（notifications）

```javascript
        angular.module('demoApp', ['cn.xuyuanxiang.ui.notifications'])
            .controller('DemoController', function ($scope, xyxNotifications) {

                //通知队列
                xyxNotifications.show([{
                    title: '系统提示',
                    closeable: true,
                    text: '通知1',
                    delay: 7000  // 7s后自动关闭
                }, {
                    title: '系统提示',
                    closeable: true,
                    text: '通知1',
                    delay: 5000
                }]);

                xyxNotifications.show([{
                    title: '系统提示',
                    closeable: true,
                    text: '通知1',
                    delay: 3000
                }, {
                    title: '系统提示',
                    closeable: true,
                    text: '通知1'
                }]);
        });

````

#### 评星（rating）

````javascript

    angular.module('demoApp', ['cn.xuyuanxiang.ui.rating'])
        .controller('DemoController', ['$scope', function($scope){
            $scope.currentScore = 3;

        }
    ]);

````

````html

    <!-- stars: 总分  score: 评分  size: font-size属性 -->
    <xyx-rating stars="5" score="currentScore" size="24" ></xyx-rating>

````

## <a id="test" name="test">测试</a>

### <a id="unit" name="unit">单元测试（Unit test）</a>

* 配置文件：`karma.conf.js`
* 测试用例：`test/unit/**/*.js`

```
npm run test
```

### <a id="e2e" name="e2e">端到端测试（End to end testing）</a>

所有测试用例皆使用[Protractor](http://angular.github.io/protractor/#/)运行

* 配置文件： `protractor.conf.js`
* 测试用例： `test/e2e/*.js`

#### 准备

下载安装最新的[WebDriver](http://docs.seleniumhq.org/projects/webdriver/)

*需要翻墙...*

```
npm run update-webdriver
```

启动 WebDriver:

```
npm run start-webdriver
```

#### 运行

首先在终端中执行以下脚本启动http-server用于与Protractor交互

```
npm start
```

然后在终端中新建一个会话，执行以下脚本运行测试用例

```
npm run protractor
```