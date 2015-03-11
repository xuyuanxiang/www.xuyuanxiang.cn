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

    var baseUrl = '';

    var mod = angular.module('cn.xuyuanxiang.constants.api', []);
    mod.value('API', {
        order: {
            save: baseUrl + 'order/jsonp/save'
        },
        location: {
            countries: baseUrl + "location/jsonp/countries",
            provinces: baseUrl + "location/jsonp/provinces",
            cities: baseUrl + "location/jsonp/cities",
            counties: baseUrl + "location/jsonp/counties"
        },
        customer: {
            normalRegister: baseUrl + "customer/jsonp/normalRegister",
            active: baseUrl + "customer/jsonp/active",
            loginByWechatOpenId: baseUrl + "customer/jsonp/loginByWechatOpenId",
            mobileUniqueCheck: baseUrl + 'customer/jsonp/mobileUniqueCheck',
            emailUniqueCheck: baseUrl + 'customer/jsonp/emailUniqueCheck',
            changePassword: baseUrl + 'customer/jsonp/changePassword',
            changePasswordByWechatOpenId: baseUrl + 'customer/jsonp/changePasswordByWechatOpenId'
        },
        address: {
            getAddress: baseUrl + "address/jsonp/get",
            saveDeliveryAddress: baseUrl + "address/jsonp/saveDeliveryAddress",
            saveDefaultDeliveryAddress: baseUrl + "address/jsonp/saveDefaultDeliveryAddress",
            removeAddress: baseUrl + "address/jsonp/delete",
            getDeliveryAddresses: baseUrl + "address/jsonp/getDeliveryAddresses",
            getDefaultDeliveryAddress: baseUrl + "address/jsonp/getDefaultDeliveryAddress",
            setDefaultDeliveryAddress: baseUrl + "address/jsonp/setDefaultDeliveryAddress"
        },
        product: {
            pageByConditions: baseUrl + 'product/jsonp/pageByConditions',
            getById: baseUrl + 'product/jsonp/getById'
        },
        productins: {
            getById: baseUrl + 'productins/jsonp/getById',
            pageByConditions: baseUrl + 'productins/jsonp/pageByConditions',
            search: baseUrl + 'productins/jsonp/search',
            getOriginCountryNameValuePairs: baseUrl + 'productins/jsonp/getOriginCountryNameValuePairs',
            getProductNameValuePairs: baseUrl + 'productins/jsonp/getProductNameValuePairs',
            getPriceArea: baseUrl + 'productins/jsonp/getPriceArea'
        },
        channel: {
            getByConditions: baseUrl + 'cms/channel/jsonp/getByConditions',
            getById: baseUrl + 'cms/channel/jsonp/getById'
        },
        article: {
            get: baseUrl + 'cms/article/jsonp/getByProductIns'
        },
        trademode: {
            get: baseUrl + 'mode/jsonp/get'
        },
        wechat: {
            bindAccountAndWechat: baseUrl + 'wechat/jsonp/bindAccountAndWechat',
            getOAuth2Token: baseUrl + 'wechat/jsonp/getOAuth2Token',
            getOAuth2UserInfo: baseUrl + 'wechat/jsonp/getOAuth2UserInfo',
            loginByWechatOpenId: baseUrl + 'wechat/jsonp/loginByWechatOpenId',
            sendOrderTaskNotice: baseUrl + 'wechat/jsonp/sendOrderTaskNotice',
            sendOrderStatusNoticeToSpecialCustomer: baseUrl + 'wechat/jsonp/sendOrderStatusNoticeToSpecialCustomer'
        },
        alipay: {
            getMobilePayRequestParams: baseUrl + 'alipay/jsonp/mobile/params'
        },
        message: {
            send: baseUrl + 'cms/message/jsonp/customer/send',
            receive: baseUrl + 'cms/message/jsonp/customer/receive'
        },
        price: {
            order: baseUrl + 'price/order'
        },
        evaluate: {
            save: baseUrl + 'evaluate/jsonp/save'
        },
        permission: {
            getCustomerAuthorities: baseUrl + 'permission/jsonp/getCustomerAuthorities'
        }
    });

})(angular);