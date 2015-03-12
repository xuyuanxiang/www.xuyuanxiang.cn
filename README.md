#个人/企业网站

**Demo** [www.xuyuanxiang.cn](http://www.xuyuanxiang.cn)

##简介
+ CMS内容管理，完全采用Html、CSS、JavaScript架构，支持数据库动态内容创建。
+ 用户模块、栏目模块、新闻模块、产品模块、招聘模块、留言模块... 可插拔模块化开发，按需载入。
+ 适用于初创型企业及个人门户网站，最低只需**年租25元**的低配服务器云空间即可部署。

前端UI框架：[Ratchet](http://goratchet.com/)

JS框架：[AngularJS](http://angularjs.org/)

*`静态资源`CDN加速由[七牛存储](http://www.qiniu.com/)提供。
`数据存储`由[Firebase](https://www.firebase.com)提供。*

##运行
项目采用Grunt构建，使用Bower解决项目依赖。


##开发

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