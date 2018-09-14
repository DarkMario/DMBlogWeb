//填充用图片链接，正式上线后，应删除。
var SHIYUANLIMEI1 = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525346547219&di=284d3926e6e67a147300544444118e9e&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201609%2F30%2F20160930224208_yZJQT.jpeg";
var SHIYUANLIMEI2 = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525346667702&di=0769597c7cb0cff671530f74f712477c&imgtype=0&src=http%3A%2F%2Fimg2.cache.netease.com%2Flady%2F2015%2F11%2F15%2F201511151925349ec04.gif";
var SHIYUANLIMEI3 = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525346699863&di=3cf5b051e4bc21d549a3bb818e5d7062&imgtype=0&src=http%3A%2F%2Fimg1.gtimg.com%2Fent%2Fpics%2Fhv1%2F15%2F174%2F2138%2F139067835.jpg";
var XINYUANJIEYI1 = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525346833217&di=9d11874c5f0205463fa292cf6f067ddb&imgtype=0&src=http%3A%2F%2Fimg1.gtimg.com%2Fcomic%2Fpics%2Fhv1%2F13%2F221%2F2230%2F145062118.jpg";
var XINYUANJIEYI2 = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525783279013&di=3e346e3e3ffcb4328a9e8626272171b9&imgtype=0&src=http%3A%2F%2Fimg0.c.yinyuetai.com%2Fvideo%2Fmv%2F160106%2F2455156%2F-M-1f35f71bbdb9e3ce3d2efdb1c8713b20_640x360.jpg";

var DEBUG = true;
var APIURL = DEBUG ? "http://192.168.2.224:8080/dc" : "";

//若要使用，只需要在页面引入本JS，并调用 reg.test(xxxx)即可
//校验规则 正则表达式 限制文本为纯英文和数字组成的，不超过6-16位的字符串。
var reg = /^[A-Za-z0-9]{6,16}$/;
//校验手机号
var phonereg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
//校验非空
var nullreg = /^[\s\S]*.*[^\s][\s\S]*$/;
var arr_week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");

(function(window) {
    var u = {};
    /**
     * [获取t天后的日期]
     * @method
     * @param  {[type]} t [任意天数]
     * @return {[type]}   [获取到的新时间]
     */
    u.getTime = function(t) {
      var today = new Date();
      var newtime=today.getTime() + 1000*60*60*24*t;
      today.setTime(newtime);
      return today;
    }
    /**
     * [输出对象全部属性]
     * @method
     * @param  {[type]} obj [需要输出日志的对象]
     */
    u.LogObject = function(obj) {
        var names = "";
        for (var name in obj) {
            names += name + ": " + obj[name] + ", ";
        }
        console.log(names);
    };
    /**
     * 判断frame或Win是否已打开
     */
    u.frameIsOpen = function(key) {
        var value = $api.getStorage(key);
        var bool = u.isEmpty(bool);
        if (bool == true) {
            //已经打开
            return true;
        } else {
            //未打开
            return false;
        }
    }


    /**
     * 返回 data 的数据类型
     * 可能的值有：array、object、null、NAN、number、undefined、string、boolean、function 以及一个默认值 unknown
     * @param {mixed} data
     * @example $g.type('icy2003'); // number
     * @return {string}
     */
    u.type = function(data) {
        var result = Object.prototype.toString.call(data);
        var type = 'unknown';
        switch (result) {
            case '[object Array]':
                type = 'array';
                break;
            case '[object Object]':
                type = 'object';
                break;
            case '[object Null]':
                type = 'null';
                break;
            case '[object Number]':
                if (isNaN(data)) {
                    type = 'NaN';
                } else {
                    type = 'number';
                }
                break;
            case '[object Undefined]':
                type = 'undefined';
                break;
            case '[object String]':
                type = 'string';
                break;
            case '[object Boolean]':
                type = 'boolean';
                break;
            case '[object Function]':
                type = 'function';
                break;
        }
        return type;
    };

    /**
     * 判断 value 是否在 array 数组里
     * @param {mixed} value
     * @param {array} array
     * @param {boolean} isStrict 严格模式，默认false。严格模式下还会对 value 的类型进行判断
     * @example $g.inArray('icy2003',['icy2003']); // true
     * @return {boolean}
     */
    u.inArray = function(value, array, isStrict) {
        isStrict = isStrict ? !!isStrict : false;
        var typeValue = u.type(value);
        for (i in array) {
            if (true === isStrict) {
                var typeArrayI = u.type(array[i]);
                if (typeValue != typeArrayI) {
                    return false;
                }
            }
            if (value == array[i]) {
                return true;
            }
        }
        return false;
    };
    /**
     * 判断 data 是否是空。空的意思就是布尔值为 false 以及[] 和 {}（空数组和空对象）
     * @param {mixed} data
     * @example $g.isEmpty('icy2003'); // false
     * @return {boolean}
     */
    u.isEmpty = function(data) {
        var type = u.type(data);
        if (u.inArray(type, ['array', 'object'])) {
            for (k in data) {
                return false;
            }
            return true;
        } else {
            return !data;
        }

    };
    /**
     * [Storage的包装]
     * @method
     * @param  {[type]} key   [缓存KEY]
     * @param  {[type]} value [缓存VALUE]
     */
    u.setStorage = function(key, value) {
        console.log("存入缓存:" + key + "：" + value);
        $api.setStorage(key, value);
    };
    u.getStorage = function(key) {
        var value = $api.getStorage(key);
        console.log("读取缓存:" + key + "的值：" + value);
        return value;
    };
    /**
     * [获取用户Token,若为空则return "" 避免上层出错]
     * @method
     * @return {[type]} [用户Token]
     */
    u.getToken = function() {
        console.log("获取用户token");
        var token = u.getStorage('token');
        return u.isEmpty(token) ? "" : token;
    };
    /**
     * [description]
     * @method
     * @param  {[type]} url [接口]
     * @return {[type]}     [需要访问的链接]
     */
    u.getUrl = function(url) {
        console.log("获取了" + url + "接口");
        var newUrl = APIURL + url;
        return newUrl;
    }




    window.$fire = u;
})(window);
