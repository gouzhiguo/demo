var Script = function () {

    $.validator.setDefaults({
        submitHandler: function() { alert("submitted!"); }
    });

    $().ready(function() {
        // validate the comment form when it is submitted
        $("#commentForm").validate();

        // validate signup form on keyup and submit
        $("#signupForm").validate({
            errorPlacement: function(error, element){
				//模板
				var Tephtml='<span class="state"><span class="iconfont control-label"></span></span>';
				var tooltiphtml='<div class="tooltip bottom" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>';
				//增加外DIVstate_box
				if(!element.parent().hasClass('state_box')){
					element.wrap('<div class="state_box"></div>');
				}
				//错误时元素判断，增加has-success
				if(element.hasClass('error')){
					element.parent('.state_box').removeClass('has-success').addClass('has-error');
					if(element.next('.state').length < 1){
						element.after(Tephtml);
					}
					element.next('.state').append(tooltiphtml).find('.tooltip-inner').append(error);
					element.next('.state').find('.iconfont').removeClass('icon-right').addClass('icon-info');
					
				}else{
					element.parent('.state_box').removeClass('has-error').addClass('has-success');
					if(element.next('.state').length < 1){
						element.after(Tephtml);
						element.next('.state').find('.tooltip').remove();
					}
					element.next('.state').find('.iconfont').removeClass('icon-info').addClass('icon-right');
				}
				//元素类型判断
				if(element.is('select')){
					element.next('.state').css('right','-23px');
				}else if(element.is('input[type=checkbox]')){
					element.next('.state').css('right','-23px');
				}				
				
            },
			//onkeyup: false,
            success: function(label){
				var state_boxObj=label.parents('.state_box');
				state_boxObj.find('.tooltip').remove();
				//成功时元素判断，增加has-success
				if(label.parents('.state').prev().hasClass('error')){
					state_boxObj.removeClass('has-success').addClass('has-error');
				}else{
					state_boxObj.removeClass('has-error').addClass('has-success');
					state_boxObj.find('.iconfont').removeClass('icon-info').addClass('icon-right');
				}
            },
            rules: {
                firstname: "required",
                lastname: "required",
                selectbox:  {required: true},
                username: {required: true, minlength: 2},
                password: {required: true,minlength: 5},
                confirm_password: {required: true,minlength: 5,equalTo:"#password"},
                email: {required: true,email: true},
                topic: {required: "#newsletter:checked",minlength:2},
                //agree: "required"
            },
            messages: {
                firstname: "请填写姓",
                lastname: "请填写名",
                selectbox: {required: "请选择"},
                username: {required: "请填写用户名",minlength: "您的用户名必须包含至少2个字符"},
                password: {required: "请输入密码",minlength: "你的密码必须至少5个字符长"},
                confirm_password: {required: "请再次输入密码",minlength: "你的密码必须至少5个字符长",equalTo: "请输入相同的密码"},
                email: "请输入一个有效的电子邮件地址",
                //agree: "请接受我们的协议"
            }
        });	
		
    });
}();