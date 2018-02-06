<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="statusEnum" value="${statusEnum}"></c:set>
<%--页头--%>
<%@ include file="../shared/_header.jsp"%>
<section class="container-fluid">
    <form class="form-horizontal m15_t" id="form">
        <div class="tab-content">
            <input type="hidden" name="sysno" value="${model.sysno==null?0:model.sysno}">
            <div class="tab-pane fade in active">
                <div class="form-group">
                    <label class="wd100 control-label"><span class="WdateFmtErr">*</span>权限名称：</label>
                    <div class="wd250 m15_l">
                        <input class="form-control" type="text" name="name" maxlength="50" value="${model.name}" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="wd100 control-label"><span class="WdateFmtErr">*</span>权限代码：</label>
                    <div class="wd250 m15_l">
                        <input class="form-control" type="text" name="code" maxlength="50" value="${model.code}">
                    </div>
                </div>
                <div class="form-group">
                    <label class="wd100 control-label">权限描述：</label>
                    <div class="wd250 m15_l">
                        <textarea class="form-control" name="description" rows="5">${model.description}</textarea>
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
        </div>
    </form>
</section>
<script type="text/javascript" src="/theme/plugins/validate/jquery.validate.min.js"></script>
<script type="text/javascript" src=/theme/plugins/validate/jquery.validate.addmethod.js"></script>
<script type="text/javascript">
    var validator = null;
    $(function () {
        validator = UI.Validator({
            formObj: $("#form"),
            rules: {
                name: {
                    required: true,
                    maxlength: 30
                },
                code: {
                    required: true,
                    maxlength: 30
                },
                description: {
                    maxlength: 200
                }
            },
            messages: {
                name: {
                    required: "权限名称不能为空",
                    maxlength: "长度不能超过30个字符",
                },
                code: {
                    required: "权限代码不能为空",
                    maxlength: "长度不能超过30个字符",
                },
                description: {
                    maxlength: "长度不能超过200个字符",
                }
            }
        });
    });

    function save() {
        if (!validator.form()) {
            return;
        }

        var data = {
            sysno: $.trim($("input[name='sysno']").val()),
            name: $.trim($("input[name='name']").val()),
            code: $.trim($("input[name='code']").val()),
            description: $.trim($("textarea[name='description']").val()),
            status: $('input:radio[name="status"]:checked').val()
        };

        $.ajax({
            url: '/permission/permissionEdit',
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function (res) {
                if (res.status) {
                    UI.Dialog().close();
                    UI.Dialog().opener.doSearch();
                    UI.Dialog().opener.Tip_success("操作成功！");
                } else {
                    UI.Tip_warning("操作失败！" + res.message);
                }
            },
            error: function (res) {
                UI.Tip_warning("操作失败！请查看网络，重新编辑。");
            }
        });
    }
</script>
<%--页尾--%>
<%@ include file="../shared/_footer.jsp"%>