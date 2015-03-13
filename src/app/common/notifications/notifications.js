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
(function(angular){
    angular.module('cn.xuyuanxiang.ui.notifications',[])
        .factory('xyxNotifications', ['$window', '$timeout', '$sce', '$animate',
            function ($window, $timeout, $sce, $animate) {


                function Notification() {

                    var self = this,
                        bodyElement = angular.element($window.document.body),
                        notificationsElement,
                        alertElement,
                        ulElement;

                    function butildMessageListItmes(messages) {
                        angular.forEach(messages, function (item) {
                            var itemElement = angular.element('<li class="media"></li>');
                            if (item.closeable) {
                                var closeBtn = angular.element('<button type="button" class="close pull-right"><span>&times;</span></button>');
                                closeBtn.on('click', function () {
                                    itemElement.remove();
                                    itemElement = null;
                                    if (ulElement.children().length <= 0)
                                        self.hide();
                                });
                                itemElement.append(closeBtn);
                            }
                            var innerElement = angular.element('<div class="media-body"></div>');
                            if (item.title) {
                                innerElement.append(angular.element('<h4 class="media-heading">' + item.title + '</h4>'));
                            }
                            if (item.text)
                                innerElement.append(angular.element('<p>' + item.text + '</p>'));
                            itemElement.append(innerElement);

                            if (item.delay)
                                $timeout(function () {
                                    itemElement.remove();
                                    itemElement = null;
                                    if (ulElement.children().length <= 0)
                                        self.hide();
                                }, item.delay);

                            ulElement.append(itemElement);
                        });
                    }

                    this.show = function (messages) {
                        if (self.state != 'show') {
                            notificationsElement = angular.element('<div class="notifications animated fadeInDown"></div>');
                            alertElement = angular.element('<div class="alert"></div>');
                            ulElement = angular.element('<ul class="media-list"></ul>');
                            butildMessageListItmes(messages);
                            alertElement.append(ulElement);
                            notificationsElement.append(alertElement);

                            bodyElement.append(notificationsElement);
                            self.state = 'show';
                        } else {
                            butildMessageListItmes(messages);
                        }
                    };

                    this.hide = function () {
                        ulElement.remove();
                        ulElement = null;
                        alertElement.remove();
                        alertElement = null;
                        notificationsElement.remove();
                        notificationsElement = null;
                        self.state = 'hide';
                    }

                }

                return new Notification;
            }

        ]);
})(angular);