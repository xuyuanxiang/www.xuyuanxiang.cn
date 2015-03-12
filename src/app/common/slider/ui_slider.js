/**
 * @overview
 *
 * @version
 * @author xuyuanxiang
 * @date 15/3/12
 * ------------------
 * @overview
 * @version
 * @modifier
 * @date
 * ------------------
 */
(function (angular) {
    var mod = angular.module('cn.xuyuanxiang.ui.slider', []);

    mod.controller('XYXSliderController', [
        '$scope', '$element', '$attrs', '$timeout', '$interval', '$parse',
        function ($scope, $element, $attrs, $timeout, $interval, $parse) {
            var self = this,
                sliders = [],
                currentSlide = null;

            $scope.currentIndex = 0;

            this.addSlide = function (slideItemScope) {
                if (sliders.indexOf(slideItemScope) <= 0) {
                    sliders.push(slideItemScope);
                    if (!currentSlide)
                        this.activeSlide(slideItemScope);
                }
            };

            this.removeSlide = function (slideItemScope) {
                var index = sliders.indexOf(slideItemScope);
                if (index !== -1) {
                    sliders.splice(index, 1);
                }
            };

            $scope.nextSlide = function () {
                if ($scope.currentIndex == sliders.length - 1)
                    $scope.currentIndex = 0;
                else
                    $scope.currentIndex += 1;
                $scope.active($scope.currentIndex);
            };

            $scope.prevSlide = function () {
                if ($scope.currentIndex == 0)
                    $scope.currentIndex = sliders.length - 1;
                else
                    $scope.currentIndex -= 1;
                $scope.active($scope.currentIndex);
            };

            this.activeSlide = function (slideItemScope) {
                $scope.currentIndex = sliders.indexOf(slideItemScope);
                currentSlide = slideItemScope;
                angular.forEach(sliders, function (item) {
                    item.active = item.$id === slideItemScope.$id;
                });
            };

            $scope.paginations = function () {
                var paginations = [];
                if ($parse($attrs.pagination)() === true) {
                    var pages = sliders.length;
                    var i = 0;
                    while (i < pages) {
                        paginations.push(i++);
                    }
                }
                return paginations;
            };

            $scope.active = function (index) {
                self.activeSlide(sliders[index]);
            };

            if ($parse($attrs.auto)() === true)
                $interval($scope.nextSlide, $attrs.delay ? $parse($attrs.delay)() : 3000);
        }
    ]).directive('xyxSlider', function () {
        return {
            restrict: 'AE',
            replace: true,
            transclude: true,
            templateUrl: 'common/slider/slider.tpl.html',
            controller: "XYXSliderController",
            link: function (scope, element, attrs, controller) {
                if (attrs.height)
                    element.css("height", attrs.height + "px");
                if (attrs.width)
                    element.css("width", attrs.width + "px");
            },
            scope: {
                pagination: "=", // true(show pagination) or false(hide pagination)
                auto: "=",
                delay: "=",
                height: "=",
                width: "="
            }
        }
    }).directive('xyxSliderItem', function () {
        return {
            restrict: "AE",
            require: '^xyxSlider',
            replace: true,
            transclude: true,
            scope: true,
            templateUrl: 'common/slider/slider_item.tpl.html',
            link: function (scope, element, attrs, tjSliderController) {
                tjSliderController.addSlide(scope);
            }
        }
    }).directive('xyxSliderItemCaption', function () {
        return {
            restrict: 'AE',
            require: '^xyxSliderItem',
            replace: true,
            transclude: true,
            template: '<div class="caption" ng-transclude></div>'
        }
    });
})(angular);