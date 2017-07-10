
define(['reqwest'],function(reqwest){
	
	var util={},ajax={};

    /**
     * dao链式调用所用对象
     * @class AjaxObj
     * @namespace utils
     */
    util.ajaxObj = function() {
        var obj = {};

        obj.done = function(callback) {
            if (callback) this._done = callback;
            return this;
        };

        obj.fail = function(callback) {
            if (callback) this._fail = callback;
            return this;
        };

        obj.empty = function(callback) {
            if (callback) this._empty = callback;
            return this;
        };

        return obj;
    };

    ajax.getJsonRequest = function(url, data ,method,type,contentType){
    	var obj = new util.ajaxObj();
        if(!contentType && (!method || method.toLowerCase() == 'get'))
            contentType = 'application/json';
    	var params={
    		url:url,
    		method:method,
    		type:type||'json',
    		contentType:contentType,
    		data: data || {},
    		jsonpCallback: 'callback'
    	}
        reqwest(params).then(function (data) {
            if (data) {
                obj._done && obj._done(data);
            } else {
                obj._empty && obj._empty();
            }
        },function (data) {
            obj._fail && obj._fail(data);
        });
        return obj;
    }

	return ajax;
});