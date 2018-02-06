<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--页头--%>
<%@ include file="../shared/_header.jsp"%>
<div class="data-wrap">
    <div class="data-tool clearfix">
        <div class="pull-left form-inline ">
        </div>
        <div class="pull-right">
            <form class="form-inline" id="formSearch" onsubmit="return false">
                <input class="form-control wd150" name="Name" type="text" placeholder="权限名称/权限代码">
            </form>
        </div>
    </div>
    <div class="paging"></div>
</div>
<script type="text/javascript">
    $(function() {
        doSearch();

        UI.DataAutoHeight();
    });

    function doSearch() {
        UI.Pager(".paging", { ajax: { url: '/menu/permissionQuery?menuSysNo=${menuSysNo}' } });
    }
</script>
<%--页尾--%>
<%@ include file="../shared/_footer.jsp"%>