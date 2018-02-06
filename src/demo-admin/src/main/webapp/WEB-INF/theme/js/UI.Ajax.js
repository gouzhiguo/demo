(function (EC) {
    //UI命名空间
    var Ajax = EC.Ajax || {};

    /*******************************
    * 重写Ajax
    * 2014-10-10 苟治国 创建
    *******************************/
    UI.Ajax = function (opt) {
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
        var _opt = $.extend(opt, {
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                fn.error(XMLHttpRequest, textStatus, errorThrown);
            },
            success: function (data, textStatus) {
                try {
                    if (data.length < 500) {
                        var dataJson = $.parseJSON(data);
                        if (dataJson.Error) {
                            UI.Alert({ content: dataJson.Message });
                            data = "";
                        }
                    }
                    if (typeof (data) === "object") {
                        if (data.Error) {
                            UI.Alert({ content: data.Message });
                            data = "";
                        }
                    }
                    if (data && data.IsLogout) {
                        eval(data.Callback);
                    }
                } catch (e) {
                }
                fn.success(data, textStatus);
            }
        });
        _opt.data.RequestIndicate = $("#RequestIndicate").val();
        $.ajax(_opt);
    };

    //导入到全局EC中
    EC.Ajax = Ajax;
})(EC);



