/**
 * @overview
 *
 * @version
 * @author xuyuanxiang
 * @date 15/3/11
 * ------------------
 * @overview
 * @version
 * @modifier
 * @date
 * ------------------
 */
(function (angular) {
    var mod = angular.module('cn.xuyuanxiang.service.httpRequest', [
        'cn.xuyuanxiang.constants.api',
        'cn.xuyuanxiang.ui.modal'
    ]);


    mod.factory('baseCache', [
        '$cacheFactory',
        function ($cacheFactory) {
            return $cacheFactory('baseCache');
        }
    ]).service('baseService', [
        '$http', '$q', 'API', 'baseCache', 'xyxAlert', 'xyxIndicator',
        function ($http, $q, api, baseCache, xyxAlert, xyxIndicator) {

            function paramsObj2URLStr(params) {
                var urls = [];
                for (var attr in params) {
                    urls.push('&');
                    urls.push(attr);
                    urls.push('=');
                    urls.push(params[attr] && 'undefined' != params[attr] && 'null' != params ? params[attr] : "");
                }
                return urls.join("");
            }

            /**
             * JSONP请求封装
             * @param model  参见request.api.js
             * @param method 参见request.api.js
             * @param params 请求参数，形如{id:"id",name:"name"}
             * @param cacheAble 是否使用缓存,true-使用缓存，false-不使用缓存
             * @param hideIndicator 是否隐藏压力指示计（小菊花），默认为开启。
             * @returns {jQuery.promise|promise.promise|promise|.Deferred.promise|d.promise|.ready.promise|*}
             */
            this.getJSONP = function (model, method, params, cacheAble, hideIndicator) {
                var deferred = $q.defer();
                var requestParams = paramsObj2URLStr(params);
                if (cacheAble) {//如果缓存
                    var cacheKey = api[model][method] + requestParams;
                    var data = baseCache.get(cacheKey);
                    if (data) {
                        deferred.resolve(data);
                        return deferred.promise;
                    }
                }
                var urls = [
                    api[model][method],
                    '?callback=JSON_CALLBACK',
                    requestParams
                ];
                if (!hideIndicator)
                    xyxIndicator.show();
                $http.jsonp(encodeURI(urls.join(""))).success(function (data) {
                    if (!hideIndicator)
                        xyxIndicator.hide();
                    if (cacheAble)
                        baseCache.put(api[model][method] + requestParams, data);
                    deferred.resolve(data);
                }).error(function (error) {
                    if (!hideIndicator)
                        xyxIndicator.hide();
                    xyxAlert.show("服务器连接失败。。。");
                    deferred.reject("服务器连接失败。。。");
                });
                return deferred.promise;
            }

        }
    ]);
})(angular);