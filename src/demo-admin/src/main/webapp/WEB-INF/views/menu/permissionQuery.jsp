<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="data-head">
    <table class="table">
        <thead>
        <tr>
            <th width="100">权限名称</th>
            <th class="t_c">权限代码</th>
            <th>备注</th>
            <th width="75">操作</th>
        </tr>
        </thead>
    </table>
</div>

<div class="data-body data-scroll">
    <div class="data-div-view">
        <table class="table table-hover">
            <tbody>
            <c:if test="${!empty list}">
                <c:forEach items="${list}" var="item">
                    <tr>
                    <td width="100">${item.name}</td>
                    <td class="t_c">${item.code}</td>
                    <td>${item.description}</td>
                        <td width="75">
                            <button type="button" class="btn btn-default" data-sysno="${item.sysno}" data-name="${item.name}" data-code="${item.code}" data-description="${item.description}" id="btn_${item.sysno}" onclick="doSelect(this);">选择</button>
                        </td>
                    </tr>
                </c:forEach>
            </c:if>
            <c:if test="${empty list}">
                <tr>
                    <td class="t_c">暂无记录</td>
                </tr>
            </c:if>
            </tbody>
        </table>
    </div>
</div>
<!-- 必要的分页参数设置 -->
<input type="hidden" id="TotalCount" value="@(Model != null ? Model.TotalCount : 0)" />
<script type="text/javascript">
    var parent = artDialog.open.origin;
    function doSelectFilter() {
        parent.$("table.table>tbody>tr").each(function (index) {
            var sysNo = $(this).find("input[name='permissionSysNo']").val();
            var obj = "#btn_" + sysNo;
            $(obj).addClass("disabled");
            $(obj).attr("onclick", "").bind("click", function () {
                var menuPermissionArray = [];
                var css = $(this).hasClass('disabled');
                if (!css) {
                    $(this).addClass("disabled");
                    var permission = {};
                    permission.sysno = $(this).data("sysno");
                    permission.name =  $(this).data("name");
                    permission.code =  $(this).data("code");
                    permission.description = $(this).data("description");
                    menuPermissionArray.push(permission);
                    parent.insertRow(menuPermissionArray);
                    $(this).text("已选");
                }
            });
            $(obj).text("已选");
        });
    }
    function doSelect(obj) {
        var menuPermissionArray = [];
        var css = $(obj).hasClass('disabled');
        if (!css) {
            $(obj).addClass("disabled");
            var permission = {};
            permission.sysno = $(obj).data("sysno");
            permission.name = $(obj).data("name");
            permission.code = $(obj).data("code");
            permission.description = $(obj).data("description");
            menuPermissionArray.push(permission);
            parent.insertRow(menuPermissionArray);
            $(obj).text("已选");
        }
    }
    $(function() {
        doSelectFilter();
    });
</script>