<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="statusEnum" value="${statusEnum}"></c:set>
<%--页头--%>
<%@ include file="../shared/_header.jsp"%>
<section class="container-fluid">
    <ul class="nav nav-tabs m15_t" id="myTab">
        <li class="active"><a href="#home" data-toggle="tab">基本信息</a></li>
        <li><a href="#role" data-toggle="tab">用户角色</a></li>
    </ul>
    <form class="form-horizontal m15_t" id="form">
        <div class="tab-content">
            <input type="hidden" name="sysno" value="${model.sysno==null?0:model.sysno}">
            <div class="tab-pane fade in active" id="home">
                <div class="form-group">
                    <label class="wd100 control-label"><span class="WdateFmtErr">*</span>用户账号：</label>
                    <div class="wd250 m15_l">
                        <input class="form-control" type="text" readonly="readonly" name="account" maxlength="20" value="${model.account}" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="wd100 control-label"><span class="WdateFmtErr">*</span>用户姓名：</label>
                    <div class="wd250 m15_l">
                        <input class="form-control" type="text" name="name" maxlength="20" value="${model.name}">
                    </div>
                </div>
                <div class="form-group">
                    <label class="wd100 control-label"><span class="WdateFmtErr">*</span>手机号码：</label>
                    <div class="wd250 m15_l">
                        <input class="form-control" type="text" name="mobile" maxlength="${model.mobile}">
                    </div>
                </div>
                <div class="form-group">
                    <label class="wd100 control-label">电子邮箱：</label>
                    <div class="wd250 m15_l">
                        <input class="form-control" type="text" name="email" maxlength="50" value="${model.email}">
                    </div>
                </div>
                <div class="form-group">
                    <label class="wd100 control-label">状态：</label>
                    <div class="wd250 m15_l">
                        <c:forEach items="${statusEnum}" var="item">
                            <c:set var="checked" value=""></c:set>
                            <c:if test="${item.key==model.status}">
                                <c:set var="checked" value="checked"></c:set>
                            </c:if>
                            <label class="m10_r">
                                <input type="radio" name="status" value="${item.key}" ${checked}/>
                                <span>${item.value}</span>
                            </label>
                        </c:forEach>
                    </div>
                </div>
            </div>

            <div class="tab-pane fade text-center m30_t m20_l" id="role">
                <select multiple="multiple" class="multi-select wd100" id="multiple_options">
                <c:forEach items="${roles}" var="item">
                    <c:set var="checked" value=""></c:set>

                    <c:if test="${item.checked==true}">
                        <c:set var="checked" value="selected='selected'"></c:set>
                    </c:if>

                    <option value="${item.sysno}" ${checked}>${item.name}</option>
                </c:forEach>
                </select>
            </div>
        </div>
    </form>
</section>

<link href="/theme/plugins/multiselect/jquery.multi-select.css" rel="stylesheet" />

<script type="text/javascript" src="/theme/plugins/validate/jquery.validate.min.js"></script>
<script type="text/javascript" src="/theme/plugins/validate/jquery.validate.addmethod.js"></script>
<script type="text/javascript" src="/theme/plugins/multiselect/jquery.multi-select.js"></script>
<script type="text/javascript" src="/theme/plugins/multiselect/jquery.quicksearch.js"></script>
<script type="text/javascript">
    $(function(){
        $('#multiple_options').multiSelect({
            selectableHeader: "<h5 class='m5_b'>待分配角色</h5>",
            selectionHeader: "<h5 class='m5_b'>已分配角色</h5>",
            height: 200
        });
    });

    function save(){
        var roleIds = [];
        var roleLength = $("#multiple_options").find("option:selected").length;
        if (roleLength > 0) {
            $("#multiple_options").find("option:selected").each(function (index) {
                roleIds.push($(this).val())
            });
        }

        var data = {
            "sysno":$("input[name='sysno']").val(),
            "account" : $("input[name='account']").val(),
            "name" : $("input[name='name']").val(),
            "mobile" : $("input[name='mobile']").val(),
            "email" : $("input[name='email']").val(),
            "status": $('input[name="status"]:checked').val(),
            "roleIds":roleIds.toString()
        };
        console.info(data)

        $.ajax({
            url: '/user/saveUser',
            type: "POST",
            data: data,
            dataType: 'json',
            success: function(res) {
                if (res.status) {
                    UI.Dialog().close();
                    UI.Dialog().opener.doSearch();
                    UI.Dialog().opener.Tip_success(res.message);
                } else {
                    UI.Dialog().opener.Tip_success(res.message);
                }
            }
        });
    }
</script>

<%--页尾--%>
<%@ include file="../shared/_footer.jsp"%>