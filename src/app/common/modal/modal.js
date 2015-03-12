/**
 * @overview
 *
 * @version
 * @author xuyuanxiang
 * @date 15/3/10
 * ------------------
 * @overview
 * @version
 * @modifier
 * @date
 * ------------------
 */
(function (angular) {
    var mod = angular.module('cn.xuyuanxiang.ui.modal', []);

    mod.service('xyxOverlay', ['$window', function ($window) {
        var bodyElement = angular.element($window.document.body);
        var overlayElement, documentOverflow, bodyOverflow;
        var self = this;
        var eventHandlers = {};

        this.bind = function (event, handlerFunc) {
            if (arguments.length == 2)
                eventHandlers[event] = handlerFunc;
        };

        this.unbind = function (event) {
            if (eventHandlers[event])
                delete eventHandlers[event];
        };

        this.show = function (closeable) {
            if (this.state == 'show')
                return;
            documentOverflow = $window.document.documentElement.style.overflow;
            bodyOverflow = $window.document.body.style.overflow;
            $window.document.documentElement.style.overflow = 'hidden';
            $window.document.body.style.overflow = 'hidden';
            overlayElement = angular.element('<div class="modal-overlay"></div>');
            if (closeable) {
                overlayElement.on('click', function () {
                    self.hide.call();
                });
            }
            bodyElement.append(overlayElement);
            overlayElement.addClass('modal-overlay-visible');
            this.state = 'show';
        };

        this.hide = function () {
            if (this.state == 'close')
                return;
            if (angular.isElement(overlayElement)) {
                $window.document.documentElement.style.overflow = documentOverflow || '';
                $window.document.body.style.overflow = bodyOverflow || '';
                if (angular.isFunction(eventHandlers['hide'])) {
                    eventHandlers['hide']();
                }
                delete eventHandlers.hide;
                overlayElement.remove();
                overlayElement = null;
                this.state = 'close';
            }
        };
    }]);

    mod.provider('xyxModal', function XYXModalProvider() {

        this.$get = ['$window', '$compile', '$sce', '$animate', 'xyxOverlay',
            function ($window, $compile, $sce, $animate, xyxOverlay) {

                var bodyElement = angular.element($window.document.body);

                function Modal() {


                    var modalElement;
                    var defaults = {
                        overlay: true,//是否显示遮罩
                        closeable: false, //是否可关闭
                        innerHtml: "",
                        title: "提示",
                        text: "",
                        buttons: [{
                            label: "确定",
                            handler: null,
                            bold: true
                        }]
                    };


                    var self = this;
                    var options = {};

                    this.show = function (configs) {

                        if (modalElement)
                            return;
                        options = angular.extend(options, defaults, configs);

                        if (!angular.isElement(modalElement)) {
                            modalElement = angular.element('<div class="modal"></div>');
                        }
                        var modalInnerHtml = angular.element('<div class="modal-inner"></div>');
                        if (options.title) {
                            var titleElement = angular.element('<div class="modal-title"></div>');
                            //titleElement.html($sce.trustAsHtml(options.title));
                            titleElement.html(options.title);
                            modalInnerHtml.append(titleElement);
                        }
                        if (options.text) {
                            var textElement = angular.element('<div class="modal-text"></div>');
                            //textElement.html($sce.trustAsHtml(options.text));
                            textElement.html(options.text);
                            modalInnerHtml.append(textElement);
                        }
                        if (options.innerHtml) {
                            var divElement = angular.element('<div style="width: auto; margin:5px -15px;"></div>');
                            //divElement.html($sce.trustAsHtml(options.innerHtml));
                            divElement.html(options.innerHtml);
                            modalInnerHtml.append(divElement);
                        }
                        modalElement.append(modalInnerHtml);


                        if (angular.isArray(options.buttons)) {
                            if (options.buttons.length <= 0) {
                                modalElement.addClass('modal-no-buttons');
                            } else {
                                var modalButtonsElement = angular.element('<div class="modal-buttons"></div>');
                                angular.forEach(options.buttons, function (btn) {
                                    var buttonElement = angular.element('<span class="modal-button">' + btn.label + '</span>');
                                    if (btn.bold)
                                        buttonElement.addClass('modal-button-bold');
                                    buttonElement.on('click', function () {
                                        if (self.state == 'open')
                                            self.hide();
                                        if (angular.isFunction(btn.handler))
                                            btn.handler.call();
                                    });
                                    modalButtonsElement.append(buttonElement);
                                });
                                modalElement.append(modalButtonsElement);
                            }
                        }

                        if (options.closeable) {
                            modalElement.on('click', function () {
                                self.hide();
                            });
                            xyxOverlay.bind('hide', function () {
                                self.hide();
                            });
                        }

                        bodyElement.append(modalElement);
                        if (options.overlay)
                            xyxOverlay.show(options.closeable);
                        modalElement.addClass('modal-in');
                        $animate.addClass(modalElement, 'modal-in').then(function () {
                            self.state = 'open';
                        });
                    };

                    this.hide = function () {
                        if (angular.isElement(modalElement)) {
                            $animate.removeClass(modalElement, 'modal-out', function () {
                                self.state = 'close';
                            });
                            modalElement.remove();
                            modalElement = null;
                        }
                        xyxOverlay.unbind('hide');
                        if (options.overlay && xyxOverlay.state == 'show')
                            xyxOverlay.hide();

                    };
                }

                return new Modal;
            }
        ];
    });

    mod.service('xyxAlert', ['xyxModal', function (xyxModal) {

        this.show = function (text, callbackFunc) {
            xyxModal.show({
                text: text,
                buttons: [
                    {
                        label: "确定",
                        handler: callbackFunc
                    }
                ]
            });
        };

        this.hide = function () {
            xyxModal.hide();
        };
    }]);

    mod.service('xyxConfirm', ['xyxModal', function (xyxModal) {


        this.show = function (text, okFunc, cancelFunc) {
            xyxModal.show({
                title: "确定",
                text: text,
                buttons: [
                    {
                        label: "取消",
                        handler: cancelFunc
                    },
                    {
                        label: "确定",
                        bold: true,
                        handler: okFunc
                    }
                ]
            });
        };

        this.hide = function () {
            xyxModal.hide();
        };


    }]);

    mod.service('xyxIndicator', ['xyxModal', function (xyxModal) {

        this.show = function (info) {
            xyxModal.show({
                title: "",
                text: "<div class='preloader active' style='width: 42px;height: 42px;'></div>",
                innerHtml: info ? info : '<h4>正在加载。。。</h4>',
                buttons: []
            });
        };

        this.hide = function () {
            xyxModal.hide();
        };
    }]);

})(angular);