/**
 * @overview
 *
 * @version
 * @author xuyuanxiang
 * @date 15/3/13
 * ------------------
 * @overview
 * @version
 * @modifier
 * @date
 * ------------------
 */
(function (angular) {
    angular.module('cn.xuyuanxiang.ui.rating', []).directive('xyxRating', function () {
        return {
            restrict: 'EA',
            scope: {
                stars: "=",
                score: "=",
                size: "="
            },
            template: '<a style="padding: 4px;color: #7a6a56;font-size: {{size}}px;" ng-click="clickStar(star)" ng-repeat="star in starArr">' +
            '<i class="glyphicon" ng-class="star <= score ? \'glyphicon-star\':\'glyphicon-star-empty\'"></i>' +
            '</a>',
            controller: ['$scope', function ($scope) {

                var stars = $scope.stars;
                var starArr = [];

                while (stars > 0) {
                    starArr.push(stars--);
                }
                $scope.starArr = starArr.reverse();


                $scope.clickStar = function (star) {
                    if ($scope.score == star) {
                        $scope.score = star - 1;
                    } else {
                        $scope.score = star;
                    }
                }
            }]
        }
    });

})(angular);