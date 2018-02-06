//苟治国 2017-11-09 创建
(function ($) {
    //备份jquery的ajax方法
    var _ajax = $.ajax;
    //重写jquery的ajax方法
    $.ajax = function (opt) {
        console.info("备份Ajax");
        //备份opt中error和success方法     
        var fn = {
            error: function (XMLHttpRequest, textStatus, errorThrown) { },
            success: function (data, textStatus) { }
        }
        if (opt.error) {
            fn.error = opt.error;
        }
        if (opt.success) {
            fn.success = opt.success;
        }
        //扩展增强处理     
        var _opt = $.extend(opt, {
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                fn.error(XMLHttpRequest, textStatus, errorThrown);
            },
            success: function (data, textStatus) {
                if (data && data.IsLogout) {
                    eval(data.Callback);
                }
                fn.success(data, textStatus);
            }
        });
        _ajax(_opt);
    };
})(jQuery);

(function ($, window, undefined) {

    //全局命名空间
    var EC = window.EC || {};

    //设定基本框架
    EC = {
        Base: {}, //基础层,所有的基础函数库,如数据验证、转换等
        DAO: {},  //数据访问层,取数据,一般为Ajax的套接口
        Util: {}, //前端工具层

    };
    //数据访问
    EC.DAO = {};
    //工具
    EC.Util = {};
    //前端展示函数库
    EC.UI = {};

    //将EC导入到全局对象  
    window.EC = EC;

}($, window));