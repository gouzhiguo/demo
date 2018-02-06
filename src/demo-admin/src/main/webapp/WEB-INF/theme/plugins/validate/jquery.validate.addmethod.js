$(function () {
    //正整数
    $.validator.addMethod("IsPositiveInteger", function (value, element) {
        var reg = /^\+?[0-9][0-9]*$/;
        return this.optional(element) || (reg.test(value));
    }, "只能为正整数");
    //身份证验证
    $.validator.addMethod("isIdCardNo", function (value, element) {
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        return this.optional(element) || (reg.test(value));
    }, "请正确输入您的身份证号码");


    //电话号码验证      
    $.validator.addMethod("isTel", function (value, element) {
        var tel = /^(\d{3,4}-?)?\d{7,9}$/g;   //电话号码格式010-12345678  
        return this.optional(element) || (tel.test(value));
    }, "请正确填写您的电话号码");


    //联系电话(手机/电话皆可)验证  
    $.validator.addMethod("isPhone", function (value, element) {
        var length = value.length;
        var mobile = /^((1[0-9]{2})+\d{8})$/;
        var tel = /^(\d{3,4}-?)?\d{7,9}$/g;
        return this.optional(element) || (tel.test(value) || mobile.test(value));

    }, "请正确填写您的联系电话");

    //中文验证
    $.validator.addMethod("isChinese", function (value, element) {
        var rule = /^[\u4E00-\u9FA5]+$/;
        return this.optional(element) || rule.test(value);
    }, "请填写中文");

    //昵称验证
    $.validator.addMethod("nickName", function (value, element) {
        return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);
    }, "昵称只能由中文，英文字母、数字和下划线组成");


    //手机验证
    $.validator.addMethod("isMobile", function (value, element) {
        var length = value.length;
        var mobile = /^((1[0-9]{2})+\d{8})$/;
        return this.optional(element) || (length == 11 && mobile.test(value));
    }, "请正确填写您的手机号码");


    // 邮政编码验证
    $.validator.addMethod("isZipCode", function (value, element) {
        var tel = /^[0-9]{6}$/;
        return this.optional(element) || (tel.test(value));
    }, "请正确填写您的邮政编码");

    //select选择项验证
    $.validator.addMethod("select", function (value, element, defaultValue) {
        if (typeof (value) != "undefined" && value.indexOf("请选择") != 0 && value != "-1")
            return true;
        return false;
    }, "请选择");

    // 字母空格验证
    $.validator.addMethod("chineseSpelling", function (value, element) {
        var chineseSpelling = /^[a-zA-Z ]+$/;
        return this.optional(element) || (chineseSpelling.test(value));
    }, "汉语拼音只能有字母和空格组成");


    // 字母数字验证
    $.validator.addMethod("letterAndNumber", function (value, element) {
        var chineseSpelling = /^[a-zA-Z0-9]+$/;
        return this.optional(element) || (chineseSpelling.test(value));
    }, "汉语拼音只能有字母和空格组成");


    // 数组最小范围
    $.validator.addMethod("minLimitNumber", function (value, element, param) {

        var reg = /^-{0,1}\d+\.{0,1}\d{0,}$/;
        if (this.optional(element) || (reg.test(value))) {
            if (parseFloat(value) < parseFloat(param)) {
                return false;
            }
            return true;
        }
        return false;
    }, "数值小于最小值");

    // 数组最大范围
    $.validator.addMethod("maxLimitNumber", function (value, element, param) {
        var reg = /^-{0,1}\d+\.{0,1}\d{0,}$/;
        if (this.optional(element) || (reg.test(value))) {
            if (parseFloat(value) > parseFloat(param)) {
                return false;
            }
            return true;
        }
        return false;
    }, "数值大于最小值");

    $.validator.addMethod("abcNum", function (value, element) {
        var tel = /^[A-Za-z0-9]+$/;
        return this.optional(element) || (tel.test(value));
    }, "只能为字母或者数字");

    $.validator.addMethod("specialChar", function (value, element) {
        return this.optional(element) || /^[\u4e00-\u9fa5a-zA-Z0-9]+$/.test(value);
    }, "不能包含特殊字符！");

    $.validator.addMethod("money", function (value, element) {
        return this.optional(element) || /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/.test(value);
    }, "只能输入金额");

    $.validator.addMethod("mobile", function (value, element) {
        return this.optional(element) || /^(13|15|18|14|17)[0-9]{9}$/.test(value);
    }, "手机号码格式错误");

    $.validator.addMethod("dateTime", function (value, element) {
        return this.optional(element) || /^((0)?\d{1}|1\d{1}|2[0-3]):[0-5]\d{1}:([0-5]\d{1})$/.test(value);
    }, "时间格式错误");

    $.validator.addMethod("lgdlat", function (value, element) {
        return this.optional(element) || /^[+-]?((([\d|[0-9]\d|1[0-7]\d)\.\d*)|180\.\d*),[+-]?((([\d|[0-9]\d|1[0-7]\d)\.\d*)|180\.\d*)$/.test(value);
    }, "经纬度格式错误");

    $.validator.addMethod("dateTime2", function (value, element) {
        return this.optional(element) || /^((0)?\d{1}|1\d{1}|2[0-3]):([0-5]\d{1})$/.test(value);
    }, "时间格式错误");
    //邮箱验证
    $.validator.addMethod("isemail", function (value, element) {
        return this.optional(element) || /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(value);
    }, "请正确填写您的手机号码");
});