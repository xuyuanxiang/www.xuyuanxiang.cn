/**
 * @overview
 *
 * @version
 * @author xuyuanxiang
 * @date 15/1/17
 * ------------------
 * @overview
 * @version
 * @modifier
 * @date
 * ------------------
 */
(function (angular) {
    var infiniteScroll = angular.module('cn.xuyuanxiang.ui.infiniteScroll', []);

    infiniteScroll.directive('xyxInfiniteScroll', ['$parse', function ($parse) {
        return function (scope, element, attrs) {
            var handler = $parse(attrs.tjInfiniteScroll);

            element.bind('scroll', scrollHandler);
            scope.$on('$destroy', function () {
                element.unbind('scroll', scrollHandler);
            });

            function scrollHandler(event) {
                var scrollTop = this.scrollTop;
                var offsetHeight = this.offsetHeight;
                var scrollHeight = this.scrollHeight;

                if (handler && scrollTop + offsetHeight >= scrollHeight) {
                    scope.$apply(function () {
                        handler(scope, {$event: event});
                    });
                }
            }
        }
    }]);
})(angular);