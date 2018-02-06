//Function扩展方法
Function.prototype.getMultiLine = function () {
    var lines = new String(this);
    lines = lines.substring(lines.indexOf("/*") + 3, lines.lastIndexOf("*/"));
    return lines;
}
var Public = Public || {};
Public.isIE6 = !window.XMLHttpRequest;	//ie6

/*获取URL参数值*/
Public.getRequest = Public.urlParam = function () {
    var param, url = location.search, theRequest = {};
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0, len = strs.length; i < len; i++) {
            param = strs[i].split("=");
            theRequest[param[0]] = decodeURIComponent(param[1]);
        }
    }
    return theRequest;
};

//数值显示格式转化
Public.numToCurrency = function (val, dec) {
    val = parseFloat(val);
    dec = dec || 2;	//小数位
    if (val === 0 || isNaN(val)) {
        return '';
    }
    val = val.toFixed(dec).split('.');
    var reg = /(\d{1,3})(?=(\d{3})+(?:$|\D))/g;
    return val[0].replace(reg, "$1,") + '.' + val[1];
};
//数值显示
Public.currencyToNum = function (val) {
    var val = String(val);
    if ($.trim(val) == '') {
        return 0;
    }
    val = val.replace(/,/g, '');
    val = parseFloat(val);
    return isNaN(val) ? 0 : val;
};
//只允许输入数字
Public.numerical = function (e) {
    var allowed = '0123456789.-', allowedReg;
    allowed = allowed.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    allowedReg = new RegExp('[' + allowed + ']');
    var charCode = typeof e.charCode != 'undefined' ? e.charCode : e.keyCode;
    var keyChar = String.fromCharCode(charCode);
    if (!e.ctrlKey && charCode != 0 && !allowedReg.test(keyChar)) {
        e.preventDefault();
    };
};

//限制只能输入允许的字符，不支持中文的控制
Public.limitInput = function (obj, allowedReg) {
    var ctrlKey = null;
    obj.css('ime-mode', 'disabled').on('keydown', function (e) {
        ctrlKey = e.ctrlKey;
    }).on('keypress', function (e) {
        allowedReg = typeof allowedReg == 'string' ? new RegExp(allowedReg) : allowedReg;
        var charCode = typeof e.charCode != 'undefined' ? e.charCode : e.keyCode;
        var keyChar = $.trim(String.fromCharCode(charCode));
        if (!ctrlKey && charCode != 0 && charCode != 13 && !allowedReg.test(keyChar)) {
            e.preventDefault();
        }
    });
};
//限制输入的字符长度
Public.limitLength = function (obj, count) {
    obj.on('keyup', function (e) {
        if (count < obj.val().length) {
            e.preventDefault();
            obj.val(obj.val().substr(0, count));
        }
    });
};


// 对Date的扩展，将 Date 转化为指定格式的String 
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
//Date.prototype.format = function (fmt) { //author: meizz 
//    var r = {
//        "yyyy": "" + this.getFullYear(),
//        "yy": "" + this.getFullYear() % 100,
//        "MM": (this.getMonth() < 9 ? "0" : "") + (this.getMonth() + 1),
//        "M": "" + this.getMonth() + 1,  
//        "dd": (this.getDate()<10?"0":"")+this.getDate(),
//        "d": ""+this.getDate(),  
//        "hh": (this.getHours()<10?"0":"")+this.getHours(), 
//        "h": this.getHours(),
//        "mm": (this.getMinutes() < 10 ? "0" : "") + this.getMinutes(),
//        "m": "" + this.getMinutes(),
//        "ss": (this.getSeconds() < 10 ? "0" : "") + this.getSeconds(),
//        "s":""+this.getSeconds()
//    };
//    for (var i in r) {
//        fmt = fmt.replace(new RegExp(i), r[i]);
//        ;
//    }
//    return fmt;
//}

//var UI = {
//    /*******************************
//    * 弹出框对象
//    * remarks: 详细设置参考:http://www.planeart.cn/demo/artDialog/_doc/API.html
//    * 被废弃的对象  禁止使用
//	Dialog: art.dialog,
//    *******************************/


//    /*******************************
//    * 关闭弹出框
//    @ id:待关闭的对话框ID
//           不传则关闭当前弹出的iframe对话框
//    *******************************/
//    CloseDialog: function (id) { },

//    /*******************************
//    * 获取弹出该弹出框的父页面window对象
//    *******************************/
//    DialogOpener: function () { },

//    /*******************************
//    *	弹出提示信息
//    *	{
//            @ content : 信息内容
//            @ callback : 回调函数
//            @ width : 对话框宽度,默认200px,内容超过15字可以根据内容长度可适当增加
//        }
//     *******************************/
//    Alert: function (useroptions) { },

//    /*******************************
//    *	弹出确认信息
//    *	{
//            @ content : 信息内容
//            @ ok : 点击确认后的回调函数
//            @ cancel : 点击取消后的回调函数
//            @ width : 对话框宽度,默认200px,内容超过15字可以根据内容长度可适当增加
//        }
//     *******************************/
//    Confirm: function (useroptions) { },

//    /*******************************
//    * 弹出框
//    * @useroptions:用户配置项 详细设置参考:http://www.planeart.cn/demo/artDialog/_doc/API.html
//    *                       扩展了 {parent:true/false} 参数,默认true 该参数用来设置获取的dialog对象位置  设置true的时候获取的对象是top  false的时候为self
//    *******************************/
//    DialogBox: function (useroptions) { },

//    /******************************* 
//    * 弹出iframe
//    * @url : 嵌入iframe的url地址
//    * @options:用户配置项 详细设置参考:http://www.planeart.cn/demo/artDialog/_doc/API.html
//    * @cache : 是否开启缓存,默认开启 true/false
//    * remark: 操作iframe参考 http://www.planeart.cn/demo/artDialog/_doc/iframeTop.html
//     *******************************/
//    DialogOpen: function (url, useroptions, cache) { },

//    /*=================/
//		tab选项卡
//	 	tabNavBox:'#tabboxs', 				最大的BOX容器
//		tabNavObj:'.tabNav',  				选项卡UL样式
//		tabNavBtn:'li',								选项卡下面的LI
//		tabContentObj:'.tabContent', 	控制下面box
//		tabContent:'.list',						控制box下面的隐藏显示层
//		currentClass:'current', 				选项卡的样式
//		eventType:'click',    				选项卡的点击方式
//		onActiveTab: null							选项卡的点击的扩展方法
//		controlUnit:true,    					控制选项可不可会
//		controlClass:null							启用选项卡样式
//		* 2014-06-13 陈建 创建
//	  ====================*/
//    Tab: function (options) { },


//    /*****************************
//    * 设置table 选择(checkbox) 插件
//    * tableSelector: 要进行设置的table选择器如:"#tableName"
//    * checkallcss:  全选checkbox样式（标题行的全选）选择器，如:".checkall"
//    * onChangeCallBack：checkbox的change事件
//    * 返回：选择器对象
//    * 提供方法：GetCheckboxSelectedItem():返回被选中的所有tr对象。    
//    * 2013-07-04 邵斌 重构
//    * 2013-07-31 邵斌 重构   加入onchange事件
//    ******************************/
//    CheckAllbox: function (tableSelector, checkallcss, onChangeCallBack) { },

//    /*****************************
//    * 设置table td详情隐藏显示 插件
//    * tableBox: 要进行设置的table选择器如:"#tableName"
//    * addhtml:  要是显示的内容
//    * step:     控制btn显示的位置
//    * trgfun:   点击的毁掉函数 返回：显示的TD对象
//    * 2014-06-10 陈建 创建
//    ******************************/
//    TableTrigger: function (options) { },

//    /*****************************
//    * 设置table td详情隐藏显示 插件
//    * tableBox: 要进行设置的table选择器如:"#tableName"
//    * editEve:  回调函数，进入编辑是发生返回obj
//    * addEve:   回调函数，返回trobj
//    * deleEve:  回调函数，返回trobj
//    * 2014-06-10 陈建 创建
//    ******************************/
//    TableEdit: function (options) { },
//    /*****************************
//    * 设置Collapsebox 根据Bootstrap的Collapse扩展插件
//    * parent:	要展开的容器
//    * panel:	要展开的内容
//    * openclass:	打开btn的样式
//    * closeclass:	关闭btn的样式
//    * clickEve:		点击回调函数
//    * 2014-06-10 陈建 创建
//    ******************************/
//    Collapsebox: function (options) { },

//    /*创建选项卡
//    creatuserid选项唯一userid
//    creaturl打开的页面url
//    creattext 选项卡的标题
//    */
//    OpenCreatTab: function (creattext, creaturl) { }

//};

var UI = {
    /*******************************
     * 弹出iframe
     * @url : 嵌入iframe的url地址
     * @options:用户配置项 详细设置参考:http://www.planeart.cn/demo/artDialog/_doc/API.html
     * @cache : 是否开启缓存,默认开启 true/false
     * remark: 操作iframe参考 http://www.planeart.cn/demo/artDialog/_doc/iframeTop.html
     *******************************/
    DialogOpen: function (url, useroptions, cache) { },

    /*******************************
   * 关闭弹出框
   @ id:待关闭的对话框ID
          不传则关闭当前弹出的iframe对话框
   *******************************/
    CloseDialog: function (id) { },

    /*******************************
     * 弹出框
     * @useroptions:用户配置项 详细设置参考:http://www.planeart.cn/demo/artDialog/_doc/API.html
     *                       扩展了 {parent:true/false} 参数,默认true 该参数用来设置获取的dialog对象位置  设置true的时候获取的对象是top  false的时候为self
     *******************************/
    DialogBox: function (useroptions) { },
    tips: {}
};

//日期
UI.Date = function (useroptions) {
    return WdatePicker(useroptions);
};

UI.DialogOpen = function (url, useroptions, cache) {
    var options = $.extend({
        onSelect: function (data) { },
    }, useroptions);

    window._ActiveCallBack = function (data) {
        options.onSelect.call(window, data);
    };
    //当前artDialog对象
    return art.dialog.open(url, options, cache);
};

UI.DialogBox = function (useroptions) {
    var options = $.extend({
        title: '提示信息',
        width: '300px',
        parent: true
    }, useroptions);

    if (options.parent) {
        //顶层artDialog对象
        return art.dialog.top.art.dialog(options);
    }
    //当前artDialog对象
    return art.dialog(options);
};

UI.Alert = function (useroptions) {
    var defaults = {
        content: '',
        title: '提示信息',
        okVal: '确定',
        callback: function () {
        },
        width: '200px'
        //icon: 'warning'
    }
    var options = $.extend(true, {}, defaults, useroptions);

    return UI.DialogBox({
        id: 'dialog_alert',
        title: options.title,
        parent: true,
        lock: true,
        fixed: true,
        padding: '20px 15px 20px 10px',
        //font-size:'14px',
        ok: true,
        okVal: options.okVal,
        cancel: false,
        cancelVal: options.cancelVal,
        width: options.width,
        content: options.content,
        close: options.callback,
        icon: options.icon
    });
};

UI.AlertInfo = function (msg) {
    var useroptions = {
        content: msg
    }
    return UI.Alert(useroptions);
};

UI.Confirm = function (useroptions) {
    //var options = $.extend({
    //    content: '',
    //    title: '提示',
    //    okVal: '确定',
    //    cancelVal: '取消',
    //    ok: function () {
    //    },
    //    cancel: function () {
    //    },
    //    id: 'dialog_confirm',
    //    width: '200px'

    //}, useroptions);
    var defaults = {
        content: '',
        title: '提示',
        okVal: '确定',
        cancelVal: '取消',
        ok: function () {
        },
        cancel: function () {
        },
        id: 'dialog_confirm',
        width: '200px'
    };
    var options = $.extend(true, {}, defaults, useroptions);
    return UI.DialogBox({
        id: options.id,
        title: options.title,
        parent: true,
        lock: true,
        fixed: true,
        icon: 'question',
        padding: '20px 15px 20px 10px',
        okVal: options.okVal,
        cancelVal: options.cancelVal,
        ok: options.ok,
        width: options.width,
        content: options.content,
        cancel: options.cancel
    });

    UI.CloseDialog = function (id) {
        if (typeof id !== 'undefined') {
            art.dialog.list[id].close();
        } else {
            art.dialog.close();
        }
    };
};

//弹出框
UI.CloseDialog = function (id) {
    if (typeof id !== 'undefined') {
        art.dialog.list[id].close();
    } else {
        art.dialog.close();
    }
};

UI.DialogOpener = function () {
    return art.dialog.opener;
};

UI.FormValidate = function ($form, options) {

    var defaults = {
        errorPlacement: function (error, element) {
            //模板
            var tephtml = '<span class="state"></span>';
            var errorhtml = '<span class="iconfont control-label icon-info"></span>';
            var tooltiphtml = '<div class="tooltip bottom" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>';
            //增加外DIVstate_box
            if (!element.parent().hasClass('state_box')) {
                element.wrap('<div class="state_box"></div>');
            }
            //错误时元素判断，增加has-success
            if (element.hasClass('error')) {
                element.parent('.state_box').removeClass('has-success').addClass('has-error');
                if (element.next('.state').length < 1) {
                    element.after(tephtml);
                }
                element.next('.state').append(tooltiphtml).find('.tooltip-inner').append(error);
                element.next('.state').prepend(errorhtml);
            } else {
                element.parent('.state_box').removeClass('has-error');
                if (element.next('.state').length < 1) {
                    element.after(tephtml);
                    element.next('.state').find('.tooltip').remove();
                }
                element.next('.state').find('.iconfont').remove();
            }
            //元素类型判断
            if (element.is('select')) {
                element.next('.state').css('right', '15px');
            } else if (element.is('input[type=checkbox]')) {
                element.next('.state').css('right', '-23px');
            }
        }
    };
    var validateOptions = $.extend(true, {}, defaults, options);
    var validator = $form.validate(validateOptions);
};

/*
*   系统表单验证提交组件
*   2015-03-20 周唐炬 创建
*   @$form  jquery表单对象
*   @options    表单验证规则，表单数据项    formdata:自定义组装表单提交json对象
*/
UI.Form = function ($form, $btn, options) {
    var defaults = {
        ignore: ".ignore",
        errorPlacement: function (error, element) {
            //模板
            var tephtml = '<span class="state"></span>';
            var errorhtml = '<span class="iconfont control-label icon-info"></span>';
            var tooltiphtml = '<div class="tooltip bottom" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>';
            //增加外DIVstate_box
            if (!element.parent().hasClass('state_box')) {
               // if ($(element).siblings().length>0) {
                //    element.wrap('<div class="state_box"></div>');
                //    $(element).before($(element).parent().prevAll());
                //    $(element).after($(element).parent().nextAll())
                //}else{
                    element.wrap('<div class="state_box vm"></div>');
               // }
            }
            //错误时元素判断，增加has-success
            if (element.hasClass('error')) {
                element.parent('.state_box').removeClass('has-success').addClass('has-error');
                if (element.next('.state').length < 1) {
                    element.after(tephtml);
                }
                element.next('.state').append(tooltiphtml).find('.tooltip-inner').append(error);
                element.next('.state').prepend(errorhtml);
            } else {
                element.parent('.state_box').removeClass('has-error');
                if (element.next('.state').length < 1) {
                    element.after(tephtml);
                    element.next('.state').find('.tooltip').remove();
                }
                element.next('.state').find('.iconfont').remove();
            }
            //元素类型判断
            if (element.is('select')) {
                element.next('.state').css('right', '15px');
            } else if (element.is('input[type=checkbox]')) {
                element.next('.state').css('right', '-23px');
            }
        },
        //onkeyup: false,
        success: function (label) {
            var stateBoxObj = label.parents('.state_box');
            stateBoxObj.find('.tooltip').remove();
            //成功时元素判断，增加has-success
            if (label.parents('.state').prev().hasClass('error')) {
                stateBoxObj.removeClass('has-success').addClass('has-error');

            } else {

                stateBoxObj.removeClass('has-error');
                stateBoxObj.find('.iconfont').remove();
            }
        },
        submitHandler: function (form) {
            //var $btnSubmit = $form.find("button[type='submit']");
            var $btnSubmit = $btn;
            if ($btnSubmit.length) {
                var notexistloading = !$btnSubmit.attr("data-loading-text");
                if (notexistloading) $btnSubmit.attr("data-loading-text", "提交中...");
                $btnSubmit.button('loading');
            }
            var data = options.formdata ? options.formdata : $form.serialize();
            $.post($form.attr("action"), data).done(function (result) {
                if (result && result.HasError) {
                    UI.Alert({ content: result.Message, icon: "error", btnClose: { text: "关闭" } });
                    if ($btnSubmit.length) $btnSubmit.button('reset');
                } else {
                    //$form.off("submit");
                    validator.resetForm();
                    if ($btnSubmit.length) $btnSubmit.button('reset');
                    if (options && $.type(options.callback) === 'function') {
                        options.callback(result);
                    } else {
                        if (options.DisableHideModal === undefined || options.DisableHideModal === false) modalHideEvent();
                        pageSearchEvent();
                    }
                    //if (options.DisableTip === undefined || options.DisableTip === false) Amps.TipAlert('alert-success', '操作成功！');
                }
            }).error(function () {
                if ($btnSubmit.length) $btnSubmit.button('reset');
            });
            return false;
        }
    };
    var validateOptions = $.extend(true, {}, defaults, options);
    var validator = $form.validate(validateOptions);

    return validator;
};

//UI.Alert = function (useroptions) {
//    var options = $.extend({
//        content: '',
//        callback: function () {
//        },
//        width: '200px',
//        icon: 'warning'
//    }, useroptions);
//    return UI.DialogBox({
//        id: 'dialog_alert',
//        title: '提示',
//        parent: true,
//        lock: true,
//        fixed: true,
//        padding: '20px 15px 20px 10px',
//        ok: true,
//        width: options.width,
//        content: options.content,
//        close: options.callback,
//        icon: options.icon
//    });
//};

//UI.Confirm = function (useroptions) {
//    var options = $.extend({
//        content: '',
//        ok: function () {
//        },
//        cancel: function () {
//        },
//        id: 'dialog_confirm',
//        width: '200px'
//    }, useroptions);

//    return UI.DialogBox({
//        id: options.id,
//        title: '确认操作',
//        parent: true,
//        lock: true,
//        fixed: true,
//        icon: 'question',
//        padding: '20px 15px 20px 10px',
//        ok: options.ok,
//        width: options.width,
//        content: options.content,
//        cancel: options.cancel
//    });
//};

//UI.DialogBox = function (useroptions) {
//    var options = $.extend({
//        title: '提示信息',
//        width: '300px',
//        parent: true
//    }, useroptions);

//    if (options.parent) {
//        //顶层artDialog对象
//        return art.dialog.top.art.dialog(options);
//    }
//    //当前artDialog对象
//    return art.dialog(options);
//};

//UI.DialogOpen = function (url, useroptions, cache) {
//    var options = $.extend({}, useroptions);

//    //当前artDialog对象
//    return art.dialog.open(url, options, cache);
//};

/*=消息框提示
specil_css:alert-success;alert-danger;alert-info;alert-warning;
=*/

UI.Tip_alert = function (specil_css, word) {
    //var true_flag = flag || false;
    var html = '<div class="alert ' + specil_css + ' fade in alertbox"><button href="javascript:;" onclick="UI.Tip_delete(this);" type="button" class="close">×</button>' + word + '</div>';
    var JS_tipObj = $('.alertbox');
    if (!JS_tipObj.hasClass(specil_css)) {
        $("body").append(html);
        setTimeout(function () {
            $('.' + specil_css).animate({
                opacity: 0
            }, 500, function () {
                $(this).remove();
            });
        }, 3000);
    }
}

UI.Tip_delete = function (obj) {
    var parentObj = $(obj).parent();
    parentObj.animate({
        opacity: 0
    }, 500);
    setTimeout(function () {
        parentObj.remove();
    }, 500);
}

// tab选项卡
UI.Tab = function (options) {
    var defaults = {
        tabNavBox: '#tabboxs',
        tabNavObj: '.tabNav',
        tabNavBtn: 'li',
        tabContentObj: '.tabContent',
        tabMeunObj: '.tabmenu',
        tabContent: '.list',
        currentClass: 'current',
        eventType: 'click',
        onActiveTab: null,
        controlUnit: false,
        controlClass: 'active'
    }

    // 处理默认参数   
    var opts = $.extend({}, defaults, options);

    $(opts.tabNavBox).each(function () {
        var $this = $(this),
$tabNavObj = $(opts.tabNavObj, $this),
$tabContentObj = $(opts.tabContentObj, $this),
$tabMeunObj = $(opts.tabMeunObj, $this),
$tabNavBtns = $(opts.tabNavBtn, $tabNavObj),
$tabContentBlocks = $(opts.tabContent, $tabContentObj);
        //菜单按钮
        var prevBtn = $tabMeunObj.find(".prev");//上一步
        var nextBtn = $tabMeunObj.find(".next");//下一步
        var compBtn = $tabMeunObj.find(".complete");//完成


        $tabNavBtns.bind(opts.eventType, function () {
            var $that = $(this);
            var _index;
            //判断是否有controlUnit是不是开启
            if (opts.controlUnit) {
                $tabNavObj.addClass("activenav");
                $tabNavBtns.eq(0).addClass(opts.controlClass);//添加active属性
                $tabActiveNavBtns = $("." + opts.controlClass, $tabNavObj);
                _index = $tabActiveNavBtns.index($that);

            } else {
                _index = $tabNavBtns.index($that);
            }


            if (_index == -1) return; //当没有active是返回
            OpenTabEvent(_index, true);

        }).eq(0).trigger(opts.eventType);


        //上一步点击事件
        prevBtn.click(function () {
            var currentOBJ = $("." + opts.currentClass, $tabNavObj);//当前选项卡
            var _index = $tabNavBtns.index(currentOBJ);
            if (_index == 0) {
                return;
            } else {
                OpenTabEvent(_index - 1, true);
            }
        });
        //下一步点击事件
        nextBtn.click(function () {
            var currentOBJ = $("." + opts.currentClass, $tabNavObj);
            //判断是否有controlUnit是不是开启
            _index = $tabNavBtns.index(currentOBJ);
            if (opts.controlUnit) {
                $tabNavBtns.eq(_index + 1).addClass(opts.controlClass);//添加active属性

            }
            nextBtndisabled(_index, $tabNavBtns.length);


        });
        //下一步点击事件时判断是不是最大选项卡
        function nextBtndisabled(mun, maxlength) {
            maxlength = maxlength - 1;//共有多少个，length是从1开始，index是从0开始。所以减1
            if (mun == maxlength) {
                return;
            } else {
                OpenTabEvent(mun + 1, true);
            }
        }




        //根据index打开选项卡
        function OpenTabEvent(mun, isClick) {
            if (mun == null) {
                return;
            } else if (mun == 0) {
                prevBtn.attr("disabled", true);
                nextBtn.show();
                compBtn.hide();
            } else if (mun == ($tabNavBtns.length - 1)) {
                nextBtn.hide();
                compBtn.show();
            } else {
                prevBtn.attr("disabled", false);
                nextBtn.show();
                compBtn.hide();
            }
            $tabNavBtns = $(opts.tabNavBtn, $(opts.tabNavObj, opts.tabNavBox));
            $tabContentBlocks = $(opts.tabContent, $(opts.tabContentObj, opts.tabNavBox));
            $tabNavBtns.eq(mun).addClass(opts.currentClass).siblings(opts.tabNavBtn).removeClass(opts.currentClass);
            $tabContentBlocks.eq(mun).show().siblings(opts.tabContent).hide();

            //扩展方法传递
            if (opts.onActiveTab != null && typeof (opts.onActiveTab) == "function") {
                var result = opts.onActiveTab(mun, $tabNavBtns);
                if (result != null && result == false)
                    return false;
            }


        }

        this.Active = OpenTabEvent;
        return this;



    });// 保存JQ的连贯操作结束
};

//插件主要内容结束
//----------------
UI.TableEdit = function (options) {
    // 处理默认参数
    var opts = {
        tableBox: '.eideTable',
        editEve: null,
        addEve: null,
        deleEve: null
    };
    opts = $.extend({}, opts, options);
    var tableObj = $(opts.tableBox);
    addEvent(); //绑定事件
    deleEvent(); //绑定事件
    //tdEidtEevent();
    var eidtTdObj = $('.edit_cell', tableObj);
    //点击TD,获得焦点时
    eidtTdObj.on('click', function () {
        editEevent($(this));
        return $(this);
    });
    //失去焦点时
    eidtTdObj.focusout(function () {
        editOutEevent($(this));
        return $(this);
    });


    //按下enter键进入下一个
    eidtTdObj.keydown(function (e) {
        JumpToNext(e, $(this));
    });

    function JumpToNext(e, obj) {
        if (e.which == 13 || e.which == 9) {
            e.preventDefault(); //浏览器不要执行与事件关联的默认动作
            eidtTdObj = $('.edit_cell', tableObj);
            var nextFocusIndex = eidtTdObj.index($(obj)) + 1;
            if (eidtTdObj.length <= nextFocusIndex) {
                //最后一个按键Enter或tab时新增
                var trobj = obj.parents('tr');
                fnAddData(trobj);
                JumpToNext(e, obj);
            } else {
                //alert(eidtTdObj.get(nextFocusIndex).html());
                editEevent(eidtTdObj.eq(nextFocusIndex));
            }
        }
    }

    //从TD变成input
    function editEevent(obj) {
        if (obj.find('.form-control').length) {
            return false;
        } else {
            if (obj.attr('data-type') == 'InpHsbox') {
                obj.addClass('editing').html('<span class="ui-combo-wrap"><i class="ui-icon-ellipsis"></i><input type="text" class="form-control input-hsbox" value="' + Public.numToCurrency(Public.currencyToNum(obj.text())) + '"></span>');
                obj.find('input').focus();//获得焦点
                //只能输入数字
                obj.children('input').on("keypress", function (e) {
                    Public.numerical(e);
                });
            } else if (obj.attr('data-type') == 'Inp') {
                obj.addClass('editing').html('<input type="text" class="form-control" value="' + Public.numToCurrency(Public.currencyToNum(obj.text())) + '">');
                obj.find('input').focus();//获得焦点
                //只能输入数字
                obj.children('input').on("keypress", function (e) {
                    Public.numerical(e);
                });
            } else if (obj.attr('data-type') == 'Sel') {
                var oldtxt = obj.text();
                obj.addClass('editing').html('<select class="form-control"></select>');
                var count = obj.children('select').find("option").length;
                for (var i = 0; i < count; i++) {
                    if (obj.children('select').get(0).options[i].text == oldtxt) {
                        obj.children('select').get(0).options[i].selected = true;
                        break;
                    }
                }
                obj.find('select').focus();//获得焦点
            }
            //扩展方法传递
            if (opts.editEve != null && typeof (opts.editEve) == "function") {
                var result = opts.editEve(obj);
                if (result != null && result == false)
                    return false;
            }

        }
    }
    //从input变成TD
    function editOutEevent(obj) {
        if (obj.attr('data-type') == 'InpHsbox') {
            obj.removeClass('editing').text(Public.numToCurrency(Public.currencyToNum(obj.find('input').val())));
        } else if (obj.attr('data-type') == 'Inp') {
            obj.removeClass('editing').text(Public.numToCurrency(Public.currencyToNum(obj.find('input').val())));
        } else if (obj.attr('data-type') == 'Sel') {
            obj.removeClass('editing').text(obj.children().find("option:selected").text());
        }
    }

    //在table中插入tr事件
    function fnAddData(trobj) {
        trobj.after(trobj.clone(true));
        trobj.next().find('.edit_cell').text('');
    }
    //添加
    function addEvent() {
        var btnadd = $(".glyphicon-plus", tableObj.find('tbody tr')).parent()
        btnadd.on('click', function () {
            var trobj = $(this).parents('tr');
            fnAddData(trobj);
            //扩展方法传递
            if (opts.addEve != null && typeof (opts.addEve) == "function") {
                var result = opts.addEve(trobj);
                if (result != null && result == false)
                    return false;
            }

        });
    }

    //删除obj.find("tbody tr")
    function deleEvent() {
        var btntrash = $(".glyphicon-trash", tableObj.find('tbody tr')).parent()

        btntrash.on('click', function () {

            if (tableObj.find('tbody tr').length == 1) {
                alert("必须有一条数据！");
                return;
            } else {
                var trobj = $(this).parents('tr');
                trobj.remove();
                //扩展方法传递
                if (opts.deleEve != null && typeof (opts.deleEve) == "function") {
                    var result = opts.deleEve(trobj);
                    if (result != null && result == false)
                        return false;
                }
            }
        });


    }

}

//TableTrigger详情展开显示
UI.TableTrigger = function (options) {
    // 处理默认参数   
    var opts = $.extend({}, UI.TableTrigger.defaults, options);
    var tableBoxobj = $(opts.tableBox);

    var nCloneTh = document.createElement('th');
    var nCloneTd = document.createElement('td');
    $trgfun = opts.trgfun;
    nCloneTh.width = 58;
    nCloneTd.innerHTML = '<a class="btn btn-primary btn-xs tgrbtn" title="设置"><span class="glyphicon glyphicon-plus"></span></a>';
    nCloneTd.className = "t_c";

    tableBoxobj.find("thead tr").each(function () {
        this.insertBefore(nCloneTh, this.childNodes[opts.step * 2]);
    });

    tableBoxobj.find("tbody tr").each(function () {
        this.insertBefore(nCloneTd.cloneNode(true), this.childNodes[opts.step * 2]);
    });

    var clickObj = $('.tgrbtn', tableBoxobj);
    clickObj.on('click', function () {
        var parentsObj = $(this).parents('tr');

        //扩展方法传递
        if (typeof ($trgfun) == "function") {
            $trgfun(parentsObj);
        }


        if ($(this).children('span').hasClass('glyphicon-plus')) {
            $(this).children('span').removeClass('glyphicon-plus').addClass('glyphicon-minus');
            parentsObj.after(opts.addhtml);

        } else {
            $(this).children('span').removeClass('glyphicon-minus').addClass('glyphicon-plus');
            parentsObj.next().remove();
        }



    });


    //插件的defaults     
    UI.TableTrigger.defaults = {
        tableBox: '.TableTrigger',
        addhtml: '<tr class="active"><td>默认行</td></tr>',
        step: 0,
        trgfun: null
    };
}

//checkallbox全选
//2013-07-04 邵斌 扩展获取所有被选择的tr行
UI.CheckAllbox = function (tableSelector, checkallcss, onChangeCallBack) {

    //获取全选checkbox对象
    var checkboxobj = $("input[type='checkbox']" + checkallcss + "", tableSelector);

    //绑定全选checkbox的click事件
    checkboxobj.on("click", function () {

        //判断点击的状态并同时修改列表中的所以checkbox状态,做状态同步
        if ($(this).prop("checked")) {
            //全选
            $(this).parents(tableSelector).find("input[type='checkbox'][disabled!='disabled']").prop("checked", true);
        } else {
            //取消全选
            $(this).parents(tableSelector).find("input[type='checkbox']").prop("checked", false);
        }

    });


    $("input[type='checkbox']", tableSelector).on("change", function () {

        //判断是否处罚外部change事件
        if (typeof (onChangeCallBack) == "function") {
            onChangeCallBack(this);
        }

        //如果当前checkbox为选中就不管全选checkbox状态，如果是取消将同步全选checkbox
        //如果是选中就返回
        if ($(this).is(":checked"))
            return true;

        var allCheckBox = $("input.checkall[type='checkbox']", $(this).closest("table"));
        if (allCheckBox.length > 0) {
            //清理全选checkbox
            allCheckBox.prop("checked", false);
        }
        return true;

    });

    //返回所有备选选择的tr行
    this.GetCheckboxSelectedItem = function () {
        //如果的到的父容器为空将不做任何操作
        var dataTable = $(tableSelector);
        var tableId = tableSelector;
        if (dataTable.length == 0) {
            return dataTable;
        }

        //的到table除全选以外所有的checkbox
        var checkedItems = $("tr input[type='checkbox']:checked", tableSelector).not($(".checkall", tableSelector))
        var result = new Array();   //结果集
        var tr;                     //tr临时变量

        //遍历结果集并找到tr
        for (var i = 0; i < checkedItems.length; i++) {

            tr = $(checkedItems[i]);
            //如果当前项不是tr就像上查找直到找到tr
            while (tr[0].tagName.toLowerCase() != "tr") {

                //如果找到父节点都到了body表示DOM有错误
                if ($(tr).parent()[0].tagName.toLowerCase() == "body") {
                    return false;
                }
                tr = $(tr).parent();
            }
            //组合结果集
            result.push(tr);
        }
        return result;
    }
    return this;
}

//创建折叠组件
UI.Collapsebox = function (options) {
    var defaults = {
        parent: "#accordion",
        panel: ".panel-collapse",
        openclass: "glyphicon-chevron-down",
        closeclass: "glyphicon-chevron-up",
        clickEve: null
    }
    var opt = $.extend(defaults, options);

    //创建折叠组件
    $(opt.panel).collapse({
        toggle: false,
        parent: opt.parent
    });
    //为触发元素添加单击事件，在回调函数里打开折叠元素，此时由于上面已经指定了parent属性，所以Bootstrap会为我们自动将其他折叠组件关闭
    $(opt.parent).find(".switch").on('click', function () {
        $(opt.parent).find("." + opt.openclass).removeClass(opt.openclass).addClass(opt.closeclass)
        //$(opt.parent).find(".switch").removeClass(opt.openclass).addClass(opt.closeclass);
        var self = this;
        var panelcomObj = $(self).parents('.panel-heading').next();
        if (panelcomObj.hasClass("in")) {
            panelcomObj.collapse("hide");
            $(self).removeClass(opt.openclass).addClass(opt.closeclass);
        } else {
            panelcomObj.collapse("show");
            $(self).removeClass(opt.closeclass).addClass(opt.openclass);
        }
        //回调函数
        if (typeof (opt.clickEve) == "function") {
            var panelObj = $(self).parents('.panel-heading').next();
            opt.clickEve(panelObj);
        }
    });
    $(opt.parent).on('show.bs.collapse', function () {
        //
    });
};


//UI.Date = function (useroptions) {
//    return WdatePicker(useroptions);
//};



/*创建选项卡
 creatuserid选项唯一userid
 creaturl打开的页面url
 creattext 选项卡的标题
 */
UI.OpenCreatTab = function (creattext, creaturl) {
    //随机数生成

    function GetRandomNum(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }
    var win = window;
    while (window.parent) {
        win = win.parent;
        //判断是不是最顶层
        if (win == win.parent) {
            var breadname = win.$(".current").children("span:last").html() + '&nbsp;&nbsp;/&nbsp;&nbsp;' + creattext;
            var userid = win.CreatTabEvent(GetRandomNum(0, 888), creattext, creaturl, breadname);
            return userid;
        }
    }
};

UI.CloseCurTab = function (id) {
    //随机数生成
    var win = window;
    while (window.parent) {
        win = win.parent;
        //判断是不是最顶层
        if (win == win.parent) {
            win.CloseCurTab(id);
        }
    }
};

//展示窗口基于collapse
UI.Triggerbox = function (options) {
    var defaults = {
        parent: "#accordion",
        clickObj: ".switch",
        panel: ".panel-collapse",
        openclass: "glyphicon-chevron-down",
        closeclass: "glyphicon-chevron-up",
        clickEve: null
    }
    var opt = $.extend(defaults, options);

    //创建折叠组件
    $(opt.panel).collapse({
        toggle: false,
        parent: opt.parent
    });
    var panelcomObj = $($(opt.panel), $(opt.parent));
    //为触发元素添加单击事件，在回调函数里打开折叠元素，此时由于上面已经指定了parent属性，所以Bootstrap会为我们自动将其他折叠组件关闭
    $(opt.parent).find(opt.clickObj).on('click', function () {
        $(opt.parent).find("." + opt.openclass).removeClass(opt.openclass).addClass(opt.closeclass)
        //$(opt.parent).find(".switch").removeClass(opt.openclass).addClass(opt.closeclass);
        var self = this;
        if (panelcomObj.hasClass("in")) {
            panelcomObj.collapse("hide");
            $(self).removeClass(opt.openclass).addClass(opt.closeclass);
        } else {
            panelcomObj.collapse("show");
            $(self).removeClass(opt.closeclass).addClass(opt.openclass);
        }

        //回调函数
        if (typeof (opt.clickEve) == "function") {
            var panelObj = $(self).parents(opt.parentsclickObj).next();
            opt.clickEve(panelObj);
        }
    });

    /*
        panelcomObj.click(function(){
            return false;
        });
        $(document).click(function(){
            if(panelcomObj.hasClass("show")) return;
            Closepanel();
        });	
    */

    $('.AdvSearchfooter > .btn', panelcomObj).click(function () {
        Closepanel();
    });
    function Closepanel() {
        panelcomObj.collapse("hide");
        $(opt.parent).removeClass(opt.openclass).addClass(opt.closeclass);
    }


    $(opt.parent).on('show.bs.collapse', function () {
        //
    });
};

//在线客服弹出，增加CreatTab事件
UI.CreatTab = function (options) {
    var defaults = {
        clickObj: "#Msbtn",
        CreatHlocat: "#onlbox_r",
        Creatlocat: "#onlbox_r",
        mscomObj: "#onlbox_m",
        tabname: "消息记录",
        tabnamehtml: '<li>{tabname}<a class="iconfont icon-guanbi m5_l"></a></li>',
        tabheadhtml: '<ul class="tabsrow"></ul>',
        tabcomhtml: "",
        closeclass: ".icon-guanbi",
        mscomObj_mr: 290
    }
    var opts = $.extend({}, defaults, options);
    opts.tabnamehtml = opts.tabnamehtml.replace("{tabname}", opts.tabname);
    //拼装HTML内容
    var CreatHlocatObj = $(opts.CreatHlocat);
    var CreatlocatObj = $(opts.Creatlocat);
    var CreatlocatObjbox = CreatlocatObj.find("#right_box")

    //在盒子中增加内容
    $(opts.clickObj).click(function () {
        if (CreatHlocatObj.children("ul").find("li").length < 1) {
            $(opts.Creatlocat).show();
            $(opts.mscomObj).css('margin-right', opts.mscomObj_mr)
        }
        if (CreatHlocatObj.children("ul").length < 1) {
            $(CreatHlocatObj.prepend(opts.tabheadhtml));
        }
        var tabstep = $(this).attr("tabstep");
        if (CreatHlocatObj.children("ul").find("li[tabstep=" + tabstep + "]").length < 1) {
            CreatHlocatObj.children("ul").append(opts.tabnamehtml);
            CreatlocatObjbox.append(opts.tabcomhtml);
            CreatHlocatObj.children("ul").find("li:last").attr({ "tabstep": tabstep });
            CreatlocatObjbox.children("div:last").attr({ "tabstep": tabstep });
            ShowEvent(tabstep);

            CreatHlocatObj.children("ul").find("li:last").on('click', function () {
                var litabstep = $(this).attr("tabstep");
                ShowEvent(litabstep);
            });
            //绑定关闭
            $(opts.closeclass, CreatHlocatObj.children("ul").find("li:last")).on('click', function () {
                var liobj = $(this).parents("li");
                var litabstep = liobj.attr("tabstep");
                if (liobj.hasClass("active")) {
                    if (liobj.prev("li").length == 1) {
                        ShowEvent(liobj.prev("li").attr("tabstep"));
                    } else {
                        ShowEvent(liobj.next("li").attr("tabstep"));
                    }
                }
                CloseEvent(litabstep);
            });
        }
    });


    function ShowEvent(tabstep) {
        CreatHlocatObj.children("ul").find("li").removeClass("active");
        CreatHlocatObj.children("ul").find("li[tabstep=" + tabstep + "]").addClass("active");
        CreatlocatObjbox.children("div").removeClass("db").addClass("dn");
        CreatlocatObjbox.children("div[tabstep=" + tabstep + "]").removeClass("dn").addClass("db");
    }

    function CloseEvent(tabstep) {
        if (CreatHlocatObj.children("ul").find("li").length == 1) {
            $(opts.Creatlocat).hide();
            $(opts.mscomObj).css('margin-right', 0)
            CreatHlocatObj.children("ul").find("li[tabstep=" + tabstep + "]").remove();
            CreatlocatObjbox.children("div[tabstep=" + tabstep + "]").remove();
        } else {
            CreatHlocatObj.children("ul").find("li[tabstep=" + tabstep + "]").remove();
            CreatlocatObjbox.children("div[tabstep=" + tabstep + "]").remove();
        }
    }


};

UI.SelectInput = function (options) {
    var defaults = {
        selectClass: "#select",
        targetClass: "#box",
        targetson: ".list",
    }
    var opts = $.extend({}, defaults, options);
    var selectObj = $(opts.selectClass);
    var targetObj = $(opts.targetClass);
    var targetson = $(opts.targetson, targetObj);
    selectObj.change(function () {
        if ($(this).val() != '') {
            var ind = $(this).get(0).selectedIndex;
            targetson.stop().fadeOut(50);
            targetson.eq(ind).stop().fadeIn();
        }
    });
};

/*****************************
 //点击显示隐藏
 * popbox:	要展开的容器
 * popclick:	点击按钮
 * popcom:	要展开的内容
 * openclass:	打开btn的样式
 * closeclass:	关闭btn的样式
 * clickEve:		点击回调函数
 * 2015-03-06 陈建 创建
 ******************************/
UI.Popoverfram = function (options) {
    var defaults = {
        popbox: "#accordion",
        popclick: ".btn",
        popcom: ".dropdown-menu",
        openclass: "icon-arrow_b",
        closeclass: "icon-arrow_t",
        hoverclass: "hover",
        openArrow: "down",
        EveObj: "mouseenter mouseleave",
        clickbackEve: null
    };
    var opt = $.extend(defaults, options);
    var popboxObj = $(opt.popbox);
    var popclickObj = $(opt.popclick);

    if (opt.openArrow == "down") {
        popboxObj.bind(opt.EveObj, function (e) {
            var popcomObj = $(this).find(opt.popcom);
            if ($(this).hasClass(opt.hoverclass)/* && (a.type == "mouseleave" || a.type == "focusout")*/) {
                $(this).removeClass(opt.hoverclass);
                //if (window.navigator.userAgent.indexOf("Chrome") !== -1) {
                    popcomObj.delay(100).slideUp(200, function () {
                        popcomObj.css({
                            height: "auto"
                        });
                    });
                //} else {
                //    popcomObj.stop(true, true).slideUp(200, function () {
                //        popcomObj.css({
                //            height: "auto"
                //        });
                //    });
                //}
            } else {
                $(this).addClass(opt.hoverclass);

                popcomObj.stop(true, true).slideDown(100, function () {
                    popcomObj.css({
                        height: "auto"
                    });
                });
                /*close_shopcart_sign = setTimeout(function(){close_shopcart()}, 100);*/
            }
        });
    } else if (opt.openArrow == "right") {
        popboxObj.hover(
            function () {
                $(this).addClass(opt.hoverclass);
                $(this).find(opt.popcom).show().stop().animate({ width: '250px' }, 200, function () {
                    $(this).css({
                    });
                });
            }, function () {
                $(this).removeClass(opt.hoverclass);
                $(this).find(opt.popcom).stop().animate({ width: '0' }, 100, function () {
                    $(this).css({
                        display: "none"
                    });
                });
            }
        );
    }
};
/*****************************
 * 在弹出层中添加下拉框导致弹出层高度不够
 *
*   hoverClass:'hover',判断条件
*    popbox: "#accordion",外层盒子
*    popclick: ".btn",//点击对象
*    popcom: ".dropdown-menu",//动作对象
*    EveObj: "mouseenter mouseleave",//事件
*    addH:'90px'//滑动高度
 /*****************************/
UI.ModalPopoverfram = function (options) {
    var defaults = {
        hoverClass: 'hover',
        popbox: "#accordion",
        popclick: ".btn",
        popcom: ".dropdown-menu",
        EveObj: "mouseenter mouseleave",
        addH: '90px'
    };
    var opt = $.extend(defaults, options);

    var popbox = $(opt.popbox);
    var popclick = $(opt.popclick);
    popclick.bind(opt.EveObj, function () {
        var popcomObj = $(this).closest(opt.popbox).find(opt.popcom);
        if ($(this).closest(opt.popbox).hasClass(opt.hoverClass)/* && (a.type == "mouseleave" || a.type == "focusout")*/) {
            $(this).closest(opt.popbox).removeClass(opt.hoverClass);
            popcomObj.css('display', 'none').closest(opt.popbox).stop().css({
                marginBottom: ''
            })
        } else {
            $(this).closest(opt.popbox).addClass(opt.hoverClass);
            popcomObj.stop(true, true).slideDown();
            $(this).closest(opt.popbox).css({
                marginBottom: opt.addH
            });
            /*close_shopcart_sign = setTimeout(function(){close_shopcart()}, 100);*/
        }
    })
};
//解决UI.Popoverfram 失去焦点出现逻辑问题
UI.loseFocusPopoverfram = function (options) {
    var defaults = {
        popbox: "#accordion",
        popclick: ".btn",
        popcom: ".dropdown-menu",
        clickbackEve: null
    };
    var opt = $.extend(defaults, options);
    var popboxObj = $(opt.popbox);
    var isIn = false;
    popboxObj.hover(function () {
        isIn = true;
    }, function () {
        isIn = false;
    });
    $(document).bind('click', function () {
        var popcomObj = popboxObj.find(opt.popcom);
        if (isIn) {
            popcomObj.stop(true, true).slideDown(100, function () {
                popcomObj.css({
                    height: "auto"
                });
            });
        } else {
            popcomObj.delay(100).slideUp(200, function () {
                popcomObj.css({
                    height: "auto"
                });
            });
        }
    })
};
/*****************************
 //点击显示隐藏(domID 最高级)
 * popbox:	要展开的容器
 * popclick:	点击按钮
 * popcom:	要展开的内容
 * openclass:	打开btn的样式
 * closeclass:	关闭btn的样式
 * clickEve:		点击回调函数
 * 2015-03-06 陈建 创建
 ******************************/
UI.OutestPopoverfram = function (options) {
    var defaults = {
        popbox: "#accordion",
        popclick: ".btn",
        popcom: ".dropdown-menu",
        openclass: "icon-arrow_b",
        closeclass: "icon-arrow_t",
        hoverclass: "hover",
        openArrow: "down",
        isHeight:false,
        addH:'90px',
        EveObj: "mouseenter mouseleave",
        clickbackEve: null
    };
    var opt = $.extend(defaults, options);
    var popboxObj = $(window.parent.document).find(opt.popbox);
    var popclickObj = popboxObj.find(opt.popclick);
    var arrowObj = popboxObj.find('.' + opt.openclass);
    var close_shopcart_sign = null;
    if (opt.openArrow == "down") {
        popboxObj.bind(opt.EveObj, function () {
            var popcomObj = $(this).find(opt.popcom);
            if ($(this).hasClass(opt.hoverclass)/* && (a.type == "mouseleave" || a.type == "focusout")*/) {
                $(this).removeClass(opt.hoverclass);
                //if (window.navigator.userAgent.indexOf("Chrome") !== -1) {

                    popcomObj.delay(100).slideUp(200, function () {
                        if(opt.isHeight){
                            popcomObj.closest(opt.popbox).stop().css({
                                marginBottom:''
                            })
                        }
                        popcomObj.css({
                            height: "auto"
                        });
                    });
                //} else {

                //    popcomObj.stop(true,true).slideUp(200, function () {
                //        if(opt.isHeight){
                //            popcomObj.closest(opt.popbox).stop().css({
                //                marginBottom:''
                //            })
                //        }
                //        popcomObj.css({
                //            height: "auto"
                //        });
                //    });
                //}
            } else {
                $(this).addClass(opt.hoverclass);
                if(opt.isHeight){
                    $(this).closest(opt.popbox).css({
                        marginBottom:opt.addH
                    });
                }
                popcomObj.stop(true,true).slideDown(100, function () {
                    popcomObj.css({
                        height: "auto"
                    });
                });
                /*close_shopcart_sign = setTimeout(function(){close_shopcart()}, 100);*/
            }
            //by fisherman
            popcomObj.find('a').click(function () {
                popcomObj.css({ display: 'none' });
                popcomObj.stop(true, true).slideUp(200, function () {
                    popcomObj.css({
                        height: "auto"
                    });
                });
            });
        });
    } else if (opt.openArrow == "right") {
        popboxObj.hover(
            function () {
                $(this).addClass(opt.hoverclass);
                $(this).find(opt.popcom).show().stop().animate({ width: '250px' }, 200, function () {
                    $(this).css({
                    });
                });
            }, function () {
                $(this).removeClass(opt.hoverclass);
                $(this).find(opt.popcom).stop().animate({ width: '0' }, 100, function () {
                    $(this).css({
                        display: "none"
                    });
                });
            }
        );
    }
};

/*******************************
   * 文件上传
   *******************************/
UI.Upload = function (useroptions) {
    var options = $.extend({
        config: 'default',
        callback: function () { },
        cancel: function () { }
    }, useroptions);

    //伪回调
    window._ActiveFileUploadCallBack = function (data) {
        $.isFunction(useroptions.callback) && useroptions.callback.call(window, data);
    };
    UI.DialogOpen('/Shared/Upload?config=' + options.config, {
        width: '650px',
        height: '436px',
        title: '选择文件',
        init: function () {
            this.button(
                {
                    name: '确认',
                    callback: function () {
                        var $iframe = this.iframe.contentWindow;
                        $iframe.CallBack();
                        return false;
                    },
                    focus: true
                }, {
                    name: '取消',
                    callback: function () {
                        options.cancel();
                    }
                }
            );
        }
    }, false);
};

(function ($) {

    UI.ajax = function (opt) {
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
                //if (data.Status!=undefined && !data.Status) {
                if (data.Error) {
                    UI.Alert({ content: data.Message });
                }
                fn.success(data, textStatus);
            }
        });
        $.ajax(_opt);
    };

    UI.downloadFile = function (src) {
        var elemIf = document.createElement("iframe");
        elemIf.src = src;//文件路径
        elemIf.style.display = "none";
        document.body.appendChild(elemIf);
    }

})(jQuery);

String.prototype.format = function () {
    var result = this;
    if (arguments.length === 0)
        return null;
    for (var i = 0; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i) + '\\}', 'gm');
        result = result.replace(re, arguments[i]);
    }
    return result;
};

//弹框预览图片
$.fn.Diapic = function (options) {
    var opts = {
        title: '',
        maxwidth: 800,
        maxheight: 500,

        Activate: function (obj) {
            //click event
        },
        CloseActivate: function (obj) {
            //close event
        }
    };

    opts = $.extend({}, opts, options);
    // this obj
    var ConObj = $(this);

    //html template
    var template = '<div class="cjoutdiv" id="cjoutdiv" style="height:{documentH}px;"></div>'
        + '<div class="cjpicbox" id="cjpicbox">'
        + '	<div class="picb"><img src="{imgsrc}" title="{title}" width="{width}" /></div>'
        + '  <div class="pictitle">'
        + '  	<div class="picclose">close</div>'
        + '  	<div class="pictit">{title2}</div>'
        + '  </div>'
        + '</div>';

    ConObj.bind('click', function () {
        var documentH = $(window.parent.document.body).height();
        var $that = $(this);
        if ($that.length > 0) {
            //create a pic object
            var pic = new Image();
            //src add
            pic.src = $that.attr('src');

            var realTit = ($that.attr('title') == '' || $that.attr('title') == null) ? '' : $that.attr('title');


            var realW, realH;
            if ((pic.width > opts.maxwidth) || (pic.height > opts.maxheight)) {
                realW = opts.maxwidth;
                realH = opts.maxheight;
            } else {
                realW = pic.width;// real width
                realH = pic.height;// real height
            }
            var Htmltem = template;
            Htmltem = Htmltem.replace('{documentH}', documentH);
            Htmltem = Htmltem.replace('{title}', realTit);
            Htmltem = Htmltem.replace('{title2}', realTit);
            Htmltem = Htmltem.replace('{imgsrc}', pic.src);
            Htmltem = Htmltem.replace('{width}', realW);
            Htmltem = Htmltem.replace('{height}', realH);

            var boxContent = window.parent.document.body;//gain the father window
            $(boxContent).append(Htmltem);
            $(window.parent.document.getElementById('cjpicbox')).css({//set picbox css
                position: 'fixed',
                top: '50%',
                left: '50%',
                marginLeft: -$(window.parent.document.getElementById('cjpicbox')).outerWidth() / 2,
                marginTop: -$(window.parent.document.getElementById('cjpicbox')).outerHeight() / 2
            });
            $(window.parent.document.getElementById('cjpicbox')).find('div.picclose').bind('click', function () {
                $(this).parents('.cjpicbox').prev('.cjoutdiv').remove();
                $(this).parents('.cjpicbox').remove();
                var result = opts.CloseActivate($(this).parents('.cjpicbox'));
                //Callback function
            });
            $(window.parent.document.getElementById('cjoutdiv')).bind('click', function () {
                $(this).next('.cjpicbox').remove();
                $(this).remove();
                var result = opts.CloseActivate($(this).next('.cjpicbox'));
                //Callback function
            });
            var result = opts.Activate($that);
            //Callback function
        }
    });
};

//模块全屏自动高度 避免max-height带来的单一性
UI.AutoHeight = function (options) {
    var opts = {
        autoHObj: '.autoHItem',//自动高度的对象
        adjustH: '1'//调节高度
    };
    opts = $.extend({}, opts, options);
    var autoHObj = $(opts.autoHObj);
    //自适应高度设置
    AutoHeight();//自动高度
    $(window).bind('resize', function () {//窗口改变
        AutoHeight();//自动高度
    });
    function AutoHeight() {
        autoHObj.each(function (i) {
            autoHObj.eq(i).css({
                height: $(window).height() - autoHObj.eq(i).offset().top - opts.adjustH,
                overflow: 'auto'
            });
        });
    }
};

//QJTtableStyle自动高度
UI.tableAutoHeight = function () {
    $(window).bind('load', function () {
        tableAutoHeight();//table自动高度
    }).bind('resize', function () {//窗口改变
        tableAutoHeight();//table自动高度
    });
    function tableAutoHeight() {
        if ($('.qjtTableStyle').length) {
            var qjtTableStyle_top = $('.qjtTableStyle').offset().top;
            var winH = $(window).height();
            var qjtTableViewH = $('.qjtTable-view');
            var qjtTablePagerH = $('.qjtTable-pager').outerHeight();
            qjtTableViewH.css({
                height: winH - qjtTableStyle_top - qjtTablePagerH,
                overflow: 'auto'
            });
        } else {
            return false;
        }
    }
};

//更多条件下来设置
UI.MoreQuerySlide = function (options) {
    var opts = {
        clickObj: '#moreQueryBtn',//点击对象
        slideObj: '#moreQueryBox'//下拉对象
    };
    opts = $.extend({}, opts, options);
    var clickObj = $(opts.clickObj);
    var slideObj = $(opts.slideObj);
    clickObj.on('click', function () {
        if (slideObj.hasClass('slided')) {
            slideObj.removeClass('slided');
            slideObj.stop(true, true).slideUp(200);
            $(this).find('.iconfont').removeClass('icon-icup').addClass('icon-icdown1');
        } else {
            slideObj.addClass('slided');
            slideObj.stop(true, true).slideDown(200);
            $(this).find('.iconfont').removeClass('icon-icdown1').addClass('icon-icup');
        }
    })
};

//关闭查询的下拉框
UI.CloseQuerySlide = function (options) {
    var opts = {
        clickObj: '#moreQueryBtn',
        slideObj: '#moreQueryBox'
    };
    opts = $.extend({}, opts, options);
    var clickObj = $(opts.clickObj);
    var slideObj = $(opts.slideObj);
    slideObj.removeClass('slided');
    slideObj.stop(true, true).slideUp(200);
    clickObj.find('.iconfont').removeClass('icon-icup').addClass('icon-icdown1');
};

$(function () {
    if ($('.btnSet').length > 0) {
        //按钮集合下拉
        UI.Popoverfram({ popbox: '.btnSet', popclick: '.btnSet>.btn', EveObj: 'mouseover mouseout' });
    }
    if ($('#moreQueryBtn').length > 0) {
        //查询下拉
        UI.MoreQuerySlide();
    }

    $(document).on("click", ".btn-search", function() {
        UI.CloseQuerySlide();
    });
});

//提示弹出
UI.tips.tip_alert = function (specil_css, word, flag) {
    var true_flag = flag || false;
    var html = [];
    html.push('<div class="tips ' + specil_css + '" id="JS_tip">');
    html.push('<a href="javascript:;" onclick="UI.tips.tip_delete();">&times;</a><span class="icons"></span>' + word + '');
    html.push('</div>');
    var str = html.join('');
    $("body").append(str);
    if ($("#JS_tip") && (!true_flag)) {
        setTimeout(function () {
            $("#JS_tip").animate({
                opacity: 0
            }, 500, function () {
                $(this).remove();
            });
        }, 3000);
        //setTimeout(function () {
        //    $("#JS_tip").remove();
        //}, 10500);
    }
}

UI.tips.tip_delete = function() {
    if ($("#JS_tip")) {
        $("#JS_tip").animate({
            opacity: 0
        }, 500);
        setTimeout(function() {
            $("#JS_tip").remove();
        }, 500);
    }
}

var _ajax = $.ajax;
$.ajax = function (opt) {
    var _success = opt && opt.success || function (a, b) { };
    var _opt = $.extend(opt, {
        success: function (data, textStatus) {
            if (data && data.IsLogout) {
                eval(data.Callback);
            } else {
                _success(data, textStatus);
            }
        }
    });
    return _ajax(_opt);
};

UI.LoginBox = function (options) {
    var defaults = {
        urlPath: "",
        message: "登录超时，请重新登录！"
    };
    var opts = $.extend(defaults, options);

    UI.Alert({
        content: opts.message,
        title: '提示',
        okVal: '关闭',
        callback: function () {
        }
    });
};