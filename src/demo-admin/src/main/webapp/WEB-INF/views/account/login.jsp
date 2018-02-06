<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>登录</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <!--CSS-->
    <link href="/theme/fonts/iconfont.css" rel="stylesheet"/>
    <link href="/theme/css/bootstrap.css" rel="stylesheet"/>
    <link href="/theme/css/framebox.css" rel="stylesheet"/>
    <link href="/theme/css/common.css" rel="stylesheet"/>
    <!--JS-->
    <script src="/theme/js/jquery.v1.10.2.js"></script>
    <script src="/theme/js/bootstrap.js"></script>
    <script src="/theme/js/SellerScroll.js"></script>
    <script src="/theme/plugins/Dialog/Dialog.yui.js"></script>
    <script src="/theme/js/framebox.js"></script>
    <script src="/theme/js/Base.js"></script>
    <script src="/theme/js/UI.js"></script>
    <script src="/theme/js/Utils.js"></script>
    <script src="/theme/js/UI.Pager.js"></script>

</head>
<body class='login-wbg'>
<section class="login-wrap">
    <div class="login-icon"><i class="iconfont icon-lock"></i></div>
    <div class="login-cont">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <label>账号</label>
                    <input type="text" placeholder="请输入账号" name="account" class="form-control" />
                </div>
                <div class="col-md-12 p15_t">
                    <label>密码</label>
                    <input type="password" placeholder="请输入密码" name="password" class="form-control" />
                </div>
                <div class="col-md-12 p15_t">
                    <label>验证码</label>
                </div>
                <div class="col-md-7">
                    <input type="text" placeholder="请输入验证码" name="verifycode" maxlength="4" class="form-control" />
                </div>
                <div class="col-md-4 text-right">
                    <img style="cursor: pointer;" width="115" height="35" src="/Security/VerifyCode" alt="验证码" onclick="javascript: this.src = '/Security/VerifyCode?r=' + Math.random();" />
                </div>
                <div class="col-md-12 p30_t">
                    <button class="btn btn-block btn-primary btn-lg" id="btnSubmit" onclick="return login()">登&nbsp;录</button>
                </div>
            </div>
        </div>
    </div>
</section>
<script type="text/javascript">
    function login() {
        var data = {
            account: $("input[name='account']").val(),
            password: $("input[name='password']").val(),
            code: $("input[name='verifycode']").val(),
        };

        $.post("/account/userLogin", data, function(res) {
            if (res.status) {
                window.location.href = "/";
            } else {
                UI.Tip_warning(res.Message);
            }
        });
    }
</script>
</body>
</html>