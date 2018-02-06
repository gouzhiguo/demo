(function (EC) {
    //UI命名空间
    var UI = EC.UI || {};


    /*******************************
    * 关闭弹出框
    @ id:待关闭的对话框ID
           不传则关闭当前弹出的iframe对话框
    *******************************/
    UI.CloseDialog = function (id) {
        if (typeof id !== 'undefined') {
            art.dialog.list[id].close();
        } else {
            art.dialog.close();
        }
    };
    /*******************************
    * 获取弹出该弹出框的父页面window对象
    *******************************/
    UI.DialogOpener = function () {
        return art.dialog.opener;
    };
    /*******************************
    *	弹出提示信息
    *	{
            @ content : 信息内容
            @ callback : 回调函数
            @ width : 对话框宽度,默认200px,内容超过15字可以根据内容长度可适当增加
        }
     *******************************/
    UI.Alert = function (useroptions) {
        var options = $.extend({
            content: '',
            callback: function () {
            },
            width: '200px',
            icon: 'warning'
        }, useroptions);
        return EC.UI.DialogBox({
            id: 'dialog_alert',
            title: '提示',
            parent: true,
            lock: true,
            fixed: true,
            padding: '20px 15px 20px 10px',
            ok: true,
            width: options.width,
            content: options.content,
            close: options.callback,
            icon: options.icon
        });
    };
    /*******************************
    *	弹出确定信息
    *	{
            @ content : 信息内容
            @ ok : 点击确定后的回调函数
            @ cancel : 点击取消后的回调函数
            @ width : 对话框宽度,默认200px,内容超过15字可以根据内容长度可适当增加
        }
     *******************************/
    UI.Confirm = function (useroptions) {
        var options = $.extend({
            content: '',
            ok: function () {
            },
            cancel: function () {
            },
            id: 'dialog_confirm',
            width: '200px'
        }, useroptions);

        return EC.UI.DialogBox({
            id: options.id,
            title: '确定操作',
            parent: true,
            lock: true,
            fixed: true,
            icon: 'question',
            padding: '20px 15px 20px 10px',
            ok: options.ok,
            width: options.width,
            content: options.content,
            cancel: options.cancel
        });
    };
    /*******************************
    * 弹出框
    * @useroptions:用户配置项 详细设置参考:http://www.planeart.cn/demo/artDialog/_doc/API.html
    *                       扩展了 {parent:true/false} 参数,默认true 该参数用来设置获取的dialog对象位置  设置true的时候获取的对象是top  false的时候为self
    *******************************/
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

    /******************************* 
    * 弹出iframe
    * @url :    嵌入iframe的url地址
    * @options: 用户配置项 详细设置参考:http://www.planeart.cn/demo/artDialog/_doc/API.html
    * @cache :  是否开启缓存,默认开启 true/false
    * remark:   操作iframe参考 http://www.planeart.cn/demo/artDialog/_doc/iframeTop.html
     *******************************/
    UI.DialogOpen = function (url, useroptions, cache) {
        var options = $.extend({}, useroptions);

        //当前artDialog对象
        return art.dialog.open(url, options, cache);
    };

    /*******************************
    * 树形控件
    * 2014-10-10 苟治国 添加
    * 使用方法参考:http://www.ztree.me/v3/api.php
*******************************/
    UI.ZTree = function () {
        return $.fn.zTree;
    }

    /*******************************
    * 日历
    * 2014-10-10 苟治国 添加
    * @useroptions:用户配置项 详细设置参考:http://www.my97.net/dp/demo/index.htm
    *******************************/
    UI.Date = function (useroptions) {
        return WdatePicker(useroptions);
    };

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

    /*******************************
        * AJAX等待锁对象遮罩
        * 2014-10-10 苟治国 添加
        * useroptions :  JSON参数对象
        * @obj :         要遮掉的JQUERY DOM对象
        * @opacity:      不透明度 0-1  未公开
        * @bgcolor:      背景颜色  未公开
        * @id :          唯一ID,创建了唯一ID后可以防止重复创建遮罩
        * @zindex:       Z轴深度
        * return :       返回一个对象,对象包含有可调用的Remove方法
        *******************************/
    UI.Mask = function (optionsin) {

        var win = window;


        if (window.top == window.self) {
            optionsin.obj = win.$("#frameBox");
        } else {
            while (window.parent) {
                win = win.parent;
                //判断是不是最顶层
                if (win == win.parent) {
                    optionsin.obj = win.$("#frameBox");
                    break;
                }
            }
        }

        var options = $.extend({
            opacity: 0.2,
            bgcolor: '#dadada',
            id: 'mask_' + Math.round(Math.random() * 10000000),
            zindex: 99
        }, optionsin);
        var obj = options.obj;
        //不传入对象 
        //如果已存在遮罩 直接退出
        if (typeof obj == 'undefined' || $('#' + options.id).length > 0) return;


        var $maskFrame = $(''
            + '<div id="' + options.id + '">'
            + ' <div style="position:position;top:0;left:0;height:' + obj.height() + 'px;width:' + obj.width() + 'px;"></div>'
            + ' <div class="mask_screen" style="height:' + obj.height() + 'px;width:' + obj.width() + 'px;position:absolute;top:0;left:0;color:red;"></div>'
            + ' <div class="mask_content" style="height:100%;width:100%;position:absolute;top:0;left:0;">'
            + '     <div style="text-align:center;margin-top:' + obj.height() / 2 + 'px"><img src="/Theme/Images/loading.gif"/></div>'
            + ' </div>'
            + '</div>'
        );

        $maskFrame.css({
            position: 'absolute',
            width: obj.width(),
            height: obj.height(),
            top: 0,
            left: 0,
            zIndex: options.zindex
        })

            .find('.mask_screen').css({
                opacity: '0.2',
                backgroundColor: '#dadada'
            })
            .find('.mask_content').css({
                zIndex: options.zindex
            })
            .find('iframe').css({
                opacity: 0
            });

        obj.after($maskFrame);
        var _overflow = obj.css('overflow');
        obj.css({ overflow: 'hidden' });

        return {
            Remove: function () {
                $maskFrame.remove();
                obj.css({ overflow: _overflow });
            }
        };
    };

    //导入到全局EC中
    EC.UI = UI;
})(EC);




//Function扩展方法
Function.prototype.getMultiLine = function () {
    var lines = new String(this);
    lines = lines.substring(lines.indexOf("/*") + 3, lines.lastIndexOf("*/"));
    return lines;
};
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


var UI = {
    /*******************************
    * 弹出框对象
    * remarks: 详细设置参考:http://www.planeart.cn/demo/artDialog/_doc/API.html
    * 被废弃的对象  禁止使用
	Dialog: art.dialog,
    *******************************/


    /*******************************
    * 关闭弹出框
    @ id:待关闭的对话框ID
           不传则关闭当前弹出的iframe对话框
    *******************************/
    CloseDialog: function (id) { },

    /*******************************
    * 获取弹出该弹出框的父页面window对象
    *******************************/
    DialogOpener: function () { },

    /*******************************
    *	弹出提示信息
    *	{
            @ content : 信息内容
            @ callback : 回调函数
            @ width : 对话框宽度,默认200px,内容超过15字可以根据内容长度可适当增加
        }
     *******************************/
    Alert: function (useroptions) { },

    /*******************************
    *	弹出确认信息
    *	{
            @ content : 信息内容
            @ ok : 点击确认后的回调函数
            @ cancel : 点击取消后的回调函数
            @ width : 对话框宽度,默认200px,内容超过15字可以根据内容长度可适当增加
        }
     *******************************/
    Confirm: function (useroptions) { },

    /*******************************
    * 弹出框
    * @useroptions:用户配置项 详细设置参考:http://www.planeart.cn/demo/artDialog/_doc/API.html
    *                       扩展了 {parent:true/false} 参数,默认true 该参数用来设置获取的dialog对象位置  设置true的时候获取的对象是top  false的时候为self
    *******************************/
    DialogBox: function (useroptions) { },

    /******************************* 
    * 弹出iframe
    * @url : 嵌入iframe的url地址
    * @options:用户配置项 详细设置参考:http://www.planeart.cn/demo/artDialog/_doc/API.html
    * @cache : 是否开启缓存,默认开启 true/false
    * remark: 操作iframe参考 http://www.planeart.cn/demo/artDialog/_doc/iframeTop.html
     *******************************/
    DialogOpen: function (url, useroptions, cache) { },

    /*=================/
		tab选项卡
	 	tabNavBox:'#tabboxs', 				最大的BOX容器
		tabNavObj:'.tabNav',  				选项卡UL样式
		tabNavBtn:'li',								选项卡下面的LI
		tabContentObj:'.tabContent', 	控制下面box
		tabContent:'.list',						控制box下面的隐藏显示层
		currentClass:'current', 				选项卡的样式
		eventType:'click',    				选项卡的点击方式
		onActiveTab: null							选项卡的点击的扩展方法
		controlUnit:true,    					控制选项可不可会
		controlClass:null							启用选项卡样式
		* 2014-06-13 陈建 创建
	  ====================*/
    Tab: function (options) { },


    /*****************************
    * 设置table 选择(checkbox) 插件
    * tableSelector: 要进行设置的table选择器如:"#tableName"
    * checkallcss:  全选checkbox样式（标题行的全选）选择器，如:".checkall"
    * onChangeCallBack：checkbox的change事件
    * 返回：选择器对象
    * 提供方法：GetCheckboxSelectedItem():返回被选中的所有tr对象。    
    * 2013-07-04 邵斌 重构
    * 2013-07-31 邵斌 重构   加入onchange事件
    ******************************/
    CheckAllbox: function (tableSelector, checkallcss, onChangeCallBack) { },

    /*****************************
    * 设置table td详情隐藏显示 插件
    * tableBox: 要进行设置的table选择器如:"#tableName"
    * addhtml:  要是显示的内容
    * step:     控制btn显示的位置
    * trgfun:   点击的毁掉函数 返回：显示的TD对象
    * 2014-06-10 陈建 创建
    ******************************/
    TableTrigger: function (options) { },

    /*****************************
    * 设置table td详情隐藏显示 插件
    * tableBox: 要进行设置的table选择器如:"#tableName"
    * editEve:  回调函数，进入编辑是发生返回obj
    * addEve:   回调函数，返回trobj
    * deleEve:  回调函数，返回trobj
    * 2014-06-10 陈建 创建
    ******************************/
    TableEdit: function (options) { },
    /*****************************
    * 设置Collapsebox 根据Bootstrap的Collapse扩展插件
    * parent:	要展开的容器
    * panel:	要展开的内容
    * openclass:	打开btn的样式
    * closeclass:	关闭btn的样式
    * clickEve:		点击回调函数
    * 2014-06-10 陈建 创建
    ******************************/
    Collapsebox: function (options) { },

    /*创建选项卡
    creatuserid选项唯一userid
    creaturl打开的页面url
    creattext 选项卡的标题
    */
    OpenCreatTab: function (creattext, creaturl) { },
    ajax: function (opt) { },

    Editor: function (selector, useroptions) { },
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

UI.DialogModal = function (options) {
    var defaults = {
        url: "",
        title: "",
        width: 640,
        height: 360,
        confirmName: "保存",
        bottom: undefined
    };

    var opts = $.extend(defaults, options);

    var initFun = function () {
        this.button(
            {
                name: opts.confirmName,
                callback: function () {
                    var iframe = this.iframe.contentWindow;
                    if (!iframe.document.body) {
                        return false;
                    }
                    iframe.save();
                    return false;
                },
                focus: true,
            },
            {
                name: '取消'
            }
        );
    };

    if (opts.bottom != undefined && opts.bottom == "cancel") {
        initFun = function () { };
    }

    UI.DialogOpen(opts.url, {
        title: opts.title,
        width: opts.width || 640,
        height: opts.height || 360,
        init: initFun,
    });
    return false;
};

UI.Alert = function (useroptions) {
    var options = $.extend({
        content: '',
        callback: function () {
        },
        width: '200px'
        /*icon: 'warning'*/
    }, useroptions);
    return UI.DialogBox({
        id: 'dialog_alert',
        title: '提示',
        parent: true,
        lock: true,
        fixed: true,
        padding: '20px 15px 20px 10px',
        ok: true,
        width: options.width,
        content: options.content,
        close: options.callback,
        icon: options.icon
    });
};

UI.Confirm = function (useroptions) {
    var options = $.extend({
        content: '',
        ok: function () {
        },
        cancel: function () {
        },
        id: 'dialog_confirm',
        width: '200px'
    }, useroptions);

    return UI.DialogBox({
        id: options.id,
        title: '确认操作',
        parent: true,
        lock: true,
        fixed: true,
        /*icon: 'question',*/
        padding: '20px 15px 20px 10px',
        ok: options.ok,
        width: options.width,
        content: options.content,
        cancel: options.cancel
    });
};

UI.DialogOpen = function (url, useroptions, cache) {
    var options = $.extend({}, useroptions);

    //当前artDialog对象
    return art.dialog.open(url, options, cache);
};

/*============================
消息框提示
specilCss:alert-success;alert-danger;alert-info;alert-warning; //弹出的颜色
word： text  //内容
=*/
UI.Tip_alert = function (specilCss, word) {
    var html = '<div class="alert ' + specilCss + ' alert-dismissible alertbox" style="position:fixed; z-index:999999; top: 0; left:2px; width:100%;" role="alert">';
    html += '<button type="button" onclick= "UI.Tip_delete(this);" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>' + word + '</strong></div>';

    var jsTipObj = $('.alertbox');
    if (!jsTipObj.hasClass(specilCss)) {
        $("body").prepend(html);
        setTimeout(function () {
            $('.' + specilCss).animate({
                opacity: 0
            }, 500, function () {
                $(this).remove();
            });
        }, 3000);
    } else {
        return;
    }
};

UI.Tip_success = function (word) {
    UI.Tip_alert("alert-success", word);
};

UI.Tip_danger = function (word) {
    UI.Tip_alert("alert-danger", word);
};

UI.Tip_info = function (word) {
    UI.Tip_alert("alert-info", word);
};

UI.Tip_warning = function (word) {
    UI.Tip_alert("alert-warning", word);
};

UI.Tip_popover = function (options) {
    var defaults = {
        element: null,
        content: "",
        isShow: false
    };

    // 处理默认参数
    var opts = $.extend({}, defaults, options);

    if (opts.element == null) {
        return;
    }
    if (opts.isShow && $.vailCenter.isNullOrEmptySpance(opts.content)) {
        return;
    }
    var objSpan = opts.element.next("div")[0];
    if (opts.isShow && !opts.element.parent().hasClass("has-error")) {
        opts.element.parent().addClass("has-error has-feedback");

        if (!objSpan) {
            objSpan = $("<div class=\"popoverDiv\" data-placement=\"bottom\" href=\"javascript:void(0);\"></div>");
            objSpan.insertAfter(opts.element);
            objSpan.popover();
        }

        $(objSpan).attr('data-container', 'body');
        $(objSpan).attr('data-toggle', 'popover');
        $(objSpan).attr('data-placement', 'bottom');
        $(objSpan).attr('data-content', opts.content);

        objSpan.click();
    }

    if (!opts.isShow && objSpan) {
        objSpan.click();

        opts.element.parent().removeClass("has-error has-feedback");
        objSpan.remove();
    }
};

UI.Dialog = function () {
    return art.dialog;
};

UI.Tip_delete = function (obj) {
    var parentObj = $(obj).parent();
    parentObj.animate({
        opacity: 0
    }, 200);
    setTimeout(function () {
        parentObj.remove();
    }, 200);
};

UI.Validator = function (options) {
    var defaults = {
        formObj: null,
        rules: {},
        messages: {}
    };
    // 处理默认参数
    var opts = $.extend({}, defaults, options);

    return opts.formObj.validate({
        ignore: "",
        rules: opts.rules,
        messages: opts.messages,
        errorElement: "em",
        errorPlacement: function (error, element) {
            UI.Tip_popover({
                element: element,
                content: error[0].innerText,
                isShow: true
            });
        },
        success: function (label, element) {
            UI.Tip_popover({
                element: $(element),
                isShow: false
            });
        }
    });
};

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
    };

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
                obj.find('input').focus(); //获得焦点
                //只能输入数字
                obj.children('input').on("keypress", function (e) {
                    Public.numerical(e);
                });
            } else if (obj.attr('data-type') == 'Inp') {
                obj.addClass('editing').html('<input type="text" class="form-control" value="' + Public.numToCurrency(Public.currencyToNum(obj.text())) + '">');
                obj.find('input').focus(); //获得焦点
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
                obj.find('select').focus(); //获得焦点
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

};


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
        var result = new Array(); //结果集
        var tr; //tr临时变量

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
    };
    return this;
};

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


UI.Date = function (useroptions) {
    return WdatePicker(useroptions);
};



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
            var userid = win.CreatTabEvent(GetRandomNum(0, 888), creaturl, creattext);
            return userid;
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
    };
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

//数据列表自动高度
UI.DataAutoHeight = function () {
    $(window).bind('load', function () {
        DataAutoHeight();//table自动高度
    }).bind('resize', function () {//窗口改变
        DataAutoHeight();//table自动高度
    });
    function DataAutoHeight() {
        if ($('.data-scroll').length) {
            var dataBodyTop = $('.data-scroll').offset().top;
            var winH = $(window).height();
            var dataViewH = $('.data-div-view');
            var dataPageH = $('.data-page').outerHeight();

            dataViewH.css({
                height: winH - dataBodyTop - dataPageH,
                overflow: 'auto'
            });
            
            $(".data-div-view").scrollTop(10);
            if ($(".data-div-view").scrollTop() > 0) {
                var tableHeadW = $(".data-head table").width();
                var tableScrollW = $(".data-scroll table").width();
                var thanW = parseInt(tableHeadW) - parseInt(tableScrollW);
                if (thanW > 0) {
                    $(".data-head").css("margin-right", thanW + "px");
                }
            } else {
                $(".data-head").css('margin-right', '0px');
            }
            $(".data-div-view").scrollTop(0);
            
        } else {
            return false;
        }
    };

};


/*
*   系统表单验证提交组件
*   @$form      jquery表单对象
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
                element.wrap('<div class="state_box dib vm"></div>');
                // }
            }
            //错误时元素判断，增加has-success
            if (element.hasClass('error')) {
                element.parent('.state_box').removeClass('has-success').addClass('has-error').addClass("dib");
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
                    UI.Confirm({ content: result.Message, icon: "error", btnClose: { text: "关闭" } });
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
            } catch (e) {
            }
            fn.success(data, textStatus);
        }
    });
    _opt.data.RequestIndicate = $("#RequestIndicate").val();
    $.ajax(_opt);
};

UI.Editor = function (selector, useroptions) {
    var options = $.extend({
        items: [
            'source', '|', 'undo', 'redo', '|', 'preview', 'cut', 'copy', 'paste', 'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript', 'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/', '|', 'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'table', 'anchor', 'link', 'unlink'
        ],
        uploadJson: "/Upload/UploadFile?folder=editor_image",
        resizeType: 1,
        resizeMode: 0,
        allowPreviewEmoticons: false,
        allowImageUpload: true,
        filePostName: "files"
    }, useroptions);

    return KindEditor.create(selector, options);
};