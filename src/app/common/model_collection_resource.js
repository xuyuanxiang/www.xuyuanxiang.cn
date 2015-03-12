/**
 * @overview 对Model的封装
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
    function inherit(ChildClass, ParentClass, methods) {
        var childMethods = ChildClass.prototype;
        ChildClass.prototype = Object.create(ParentClass.prototype);
        ChildClass.prototype.constructor = ChildClass; // restoring proper constructor for child class
        angular.forEach(Object.keys(childMethods), function (k) {
            ChildClass.prototype[k] = childMethods[k];
        });
        if (angular.isObject(methods)) {
            angular.extend(ChildClass.prototype, methods);
        }
        return ChildClass;
    }

    var mod = angular.module('cn.xuyuanxiang.resource', [
        'cn.xuyuanxiang.service.httpRequest'
    ]);

    mod.factory('XYXModel', ['httpRequest', '$q', function (httpRequest, $q) {
        function XYXModel(obj) {
            var self = this;
            for (var attr in obj) {
                self[attr] = obj[attr];
            }
            this.request = function (apiKey, method, params, cacheable, hideIndicator) {
                return httpRequest.getJSONP(apiKey, method, params, cacheable, hideIndicator).then(function (data) {
                    for (var attr in data) {
                        self[attr] = data[attr];
                    }
                });
            }
        }

        //XYXModel.prototype = Object.prototype;

        XYXModel.xyxExtend = function (ChildClass, methods) {
            if (arguments.length === 1 && angular.isObject(ChildClass)) {
                methods = ChildClass;
                ChildClass = function () {
                    XYXModel.apply(this, arguments);
                };
            }
            return inherit(ChildClass, XYXModel, methods);
        };

        return XYXModel;

    }]);


    mod.factory('XYXCollection', ['httpRequest', 'XYXModel', function (httpRequest, XYXModel) {

        var XYXCollection = function (XYXModelClass) {
            var self = this;
            var _ModelClass = XYXModelClass;

            this.setModelClass = function (ModelClass) {
                _ModelClass = ModelClass;
            };

            this.request = function (apiKey, method, params, cacheable, hideIndicator) {
                return httpRequest.getJSONP(apiKey, method, params, cacheable, hideIndicator)
                    .then(function (data) {
                        if (data.total) {
                            self.total = data.total;
                            self.page = params.page;
                            self.rows = params.rows;
                            data = data.rows;
                        }
                        if (!_ModelClass)
                            _ModelClass = XYXModel;
                        angular.forEach(data, function (item) {
                            self.push(new _ModelClass(item));
                        });
                        //self.push(data);
                    }
                );
            };
        };

        XYXCollection.prototype = Array.prototype;

        XYXCollection.xyxExtend = function (ChildClass, methods) {
            if (arguments.length === 1 && angular.isObject(ChildClass)) {
                methods = ChildClass;
                ChildClass = function () {
                    XYXCollection.apply(this, arguments);
                };
            }
            return inherit(ChildClass, XYXCollection, methods);
        };

        return XYXCollection;

    }]);
})(angular);