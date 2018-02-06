/**
 * jQuery upload v1.2
 * http://www.ponxu.com
 *
 * @author xwz
 */
(function ($) {
    var noop = function () { return true; };
    var frameCount = 0;

    $.uploadDefault = {
        url: '',
        fileName: 'filedata',
        dataType: 'json',
        params: {},
        onSuccess: noop,
        onError: noop
    };

    $.upload = function (options) {
        var opts = $.extend(jQuery.uploadDefault, options);
        if (opts.url == '') {
            return;
        }

        var fileDivName = 'upload_div_' + (frameCount++);
        var fileInput = $('<input type="file" name="' + opts.fileName + '" id="' + opts.fileName + '" >');
        var fileDiv = $('<div style="position:absolute;top:-9999px;display:none;" />').attr('name', fileDivName);
        fileDiv.append(fileInput);
        fileInput.click();

        fileInput.change(function () {
            $.ajaxFileUpload({
                url: opts.url, //用于文件上传的服务器端请求地址
                secureuri: false, //是否需要安全协议，一般设置为false
                fileElementObj: fileInput, //文件上传域的ID
                dataType: opts.dataType, //返回值类型 一般设置为json
                data: opts.params,
                success: function (data, status) //服务器成功响应处理函数
                {
                    opts.onSuccess(data);
                    setTimeout(function () {
                        fileDiv.remove();
                    }, 5000);
                },
                error: function (data, status, e) //服务器响应失败处理函数
                {
                    opts.onError(data);
                }
            });
        });
    };
})(jQuery);
