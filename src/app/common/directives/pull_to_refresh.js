/**
 * @overview 向下拉动
 *
 * @version
 * @author xuyuanxiang
 * @date 15/1/16
 * ------------------
 * @overview
 * @version
 * @modifier
 * @date
 * ------------------
 */
(function (angular) {
    var pullToRefresh = angular.module('cn.xuyuanxiang.ui.pullToRefresh', []);

    pullToRefresh.directive('xyxPullToRefresh', ['$parse', '$animate', function ($parse, $animate) {
        return function (scope, element, attrs) {
            var handler = $parse(attrs.tjPullToRefresh);
            var startCoords;

            element.bind('touchstart mousedown', startHandler);

            element.bind('touchend mouseup', endHandler);

            scope.$on('$destroy', function () {
                return element.unbind('touchstart mousedown', startHandler)
                    && element.unbind('touchend mouseup', endHandler);
            });

            function startHandler(event) {
                startCoords = getCoordinates(event);
            }

            function endHandler(event) {
                if (validSwipe(getCoordinates(event))) {
                    scope.$apply(function () {
                        handler(scope, {$event: event});
                    });
                }
            }

            function getCoordinates(event) {
                var touches = event.touches && event.touches.length ? event.touches : [event];
                var e = (event.changedTouches && event.changedTouches[0]) ||
                    (event.originalEvent && event.originalEvent.changedTouches &&
                    event.originalEvent.changedTouches[0]) ||
                    touches[0].originalEvent || touches[0];

                return {
                    x: e.clientX,
                    y: e.clientY
                };
            }

            function validSwipe(coords) {
                if (!startCoords) return false;
                //var deltaY = Math.abs(coords.y - startCoords.y);
                var deltaY = coords.y - startCoords.y;
                return deltaY > 30;
            }
        }
    }]);
})(angular);