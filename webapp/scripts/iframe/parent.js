/**
 * Created by Neeke on 16/12/3.
 *
 * 注意，此处仅用于资源瀑布图，因与iframe通信，require和seajs不能共存，所以把CW中一部分代码摘出。
 */

var ObjectTraceEnum = {
    'loadObjectTraceRouteData': '/synthetic_snapshot_load/loadObjectTraceRouteData/x',
    'loadObjectPingData': '/synthetic_snapshot_load/loadObjectPingData/x',
    'loadObjectDnsData': '/synthetic_snapshot_load/loadObjectDnsData/x',
};

var CW = (function () {
    /**
     *     CW.restGet('http://dev.jkb.neeke.com/get', {'a': 'b'},
     *      function (data) {
     *          do success
     *      }, function (data) {
     *          do error
     *      })
     *
     * @param url
     * @param data
     * @param success
     * @param error
     * @param type
     * @param async
     * @returns {*}
     */
    var restGet = function (url, data, success, error, type, isAsync) {
        async = true;
        if (isAsync != 'undefined' && isAsync == false) {
            async = false;
        }
        var der = $.Deferred();
        $.ajax({
            url: url,
            type: type || "get",
            data: data,
            dataType: "json",
            async: async,
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //todo   alert it
            }
        }).done(function (data) {
            if (data && data.code === 1000) {
                if (typeof success === "function") {
                    success.call(this, data);
                }
                der.resolve(data);
            }
            else {
                if (typeof error === 'function') {
                    error.call(this, data);
                }
                der.reject(data);
            }
        }).fail(function () {
            der.reject(arguments);
        });
        return der.promise();
    };

    /**
     *     CW.restPost('http://dev.jkb.neeke.com/post', {'a': 'b'},
     *      function (data) {
         *          do success
         *      }, function (data) {
         *          do error
         *      })
     *
     * @param url
     * @param data
     * @param success
     * @param error
     * @returns {*}
     */
    var restPost = function (url, data, success, error, async) {
        return CW.restGet(url, data, success, error, "post", async);
    };

    return {
        restGet: restGet,
        restPost: restPost
    }
})();

var ObjectTrace = (function () {


    var ObjectTrace = {
        'getTraceData': function (url) {

            var content = '';
            CW.restGet(ObjectTraceEnum.loadObjectTraceRouteData, {
                page_id: window.page_id,
                object_url: url
            }, function (data) {
                content = data.data;
            }, function (data) {

            }, 'get', false);

            return content;
        },

        'getPingData': function (url) {
            var content = '';
            CW.restGet(ObjectTraceEnum.loadObjectPingData, {
                page_id: window.page_id,
                object_url: url
            }, function (data) {
                content = data.data;
            }, function (data) {

            }, 'get', false);

            return content;
        },

        'getDnsData': function (url) {
            var content = '';
            CW.restGet(ObjectTraceEnum.loadObjectDnsData, {
                page_id: window.page_id,
                object_url: url
            }, function (data) {
                content = data.data;
            }, function (data) {

            }, 'get', false);

            return content;
        }

    };

    return ObjectTrace;
})();
