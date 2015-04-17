/**
 * @overview
 *
 * @version
 * @author xuyuanxiang
 * @date 15/3/3
 * ------------------
 * @overview
 * @version
 * @modifier
 * @date
 * ------------------
 */
(function (angular) {
    var mod = angular.module('cn.xuyuanxiang.ui.navbar', []);

    /**
     * 视图：顶部导航数据模型。
     */
    mod.factory('View', ['$location', function ($location) {
        function View(title, route) {
            //正中标题
            this.title = title;
            //当前视图的路由
            this.route = route;
            //正中分段按钮
            this.segmentedControls = [];
            // 左右按钮组
            this.leftBarButtonItems = [];
            this.rightBarButtonItems = [];

            var self = this;

            //默认返回按钮
            this.backBarButton = {
                className: 'icon icon-left-nav',
                label: ''
            };

            this.viewWillLoad = function (view) {

            };

            //生命周期
            //销毁前
            this.viewWillDestory = function (view) {

            };

            //生命周期
            //销毁后
            this.viewDidDestory = function (view) {

            };

            this.destroy = function () {
                if (angular.isFunction(self.viewWillDestory))
                    self.viewWillDestory(self);
                if (angular.isFunction(self.viewDidDestory))
                    self.viewDidDestory(self);
                self = null;
            };


        }

        View.initWithLocationUrl = function (title) {
            return new View(title, $location.url());
        };

        return View;
    }]);

    /**
     * 顶部导航视图栈
     */
    mod.service('navgationStacks', ['View', function (View) {
        var stacks = [];
        var top = 0;
        var _listener;
        var self = this;

        function executeListener() {
            if (angular.isFunction(_listener))
                _listener(self.currentView(), self.previousView(), top);
        }

        this.addStacksChangeListener = function (fn) {
            _listener = fn;
        };

        this.push = function (view) {
            if (view && view instanceof View) {
                if (angular.isArray(view.rightBarButtonItems))
                    view.rightBarButtonItems.reverse();
                stacks.push(view);
                top = stacks.length;
                executeListener();
                return view;
            } else {
                return null;
            }
        };

        this.flush = function (view) {
            if (stacks.length == 0) {
                return self.push(view);
            } else {
                var index = stacks.indexOf(view);
                if (index !== -1) {
                    while (top - 1 > index) {
                        stacks.splice(top - 1, 1);
                        top--;
                    }
                    top = stacks.length;
                    executeListener();
                    return view;
                } else {
                    return self.push(view);
                }
            }
        };

        this.pop = function () {
            if (stacks.length > 0) {
                var view = stacks.pop();
                top = stacks.length;
                executeListener();
                return view;
            } else {
                return null;
            }
        };

        this.previousView = function () {
            if (top >= 2) {
                return stacks[top - 2];
            } else {
                return null;
            }
        };

        this.currentView = function () {
            if (top >= 1) {
                return stacks[top - 1];
            } else {
                return null;
            }
        };

        this.viewNums = top;
    }]);

    mod.controller('UINavbarController', ['$scope', '$element', '$attrs', '$location', '$window', 'navgationStacks',
        function ($scope, $element, $attrs, $location, $window, navgationStacks) {
            $scope.goBack = function () {
                if (navgationStacks.pop()) {
                    var view = navgationStacks.currentView();
                    if (view.route) {
                        navgationStacks.pop();
                        $location.url(view.route);
                    } else {
                        //$window.history.go(-1);
                    }
                }
            };
            $scope.activeSegmented = function (seg) {
                angular.forEach($scope.currentView.segmentedControls, function (item) {
                    item.active = item == seg;
                });
                if (angular.isFunction(seg.clickHandler))
                    seg.clickHandler(seg);
            };
        }
    ]);


    mod.directive('tjNavbar', ['navgationStacks', function (navgationStacks) {
        return {
            restrict: 'AE',
            transclude: true,
            replace: true,
            scope: true,
            priority: 999,
            templateUrl: 'navbar.tpl.html',
            controller: 'UINavbarController',
            link: function (scope) {
                navgationStacks.addStacksChangeListener(function (newView, oldView, total) {
                    scope.currentView = newView;
                    scope.viewNums = total;
                    scope.previousView = oldView;
                });
            }
        }
    }]);

})(angular);
