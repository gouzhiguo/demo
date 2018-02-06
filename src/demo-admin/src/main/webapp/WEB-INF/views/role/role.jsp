<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--页头--%>
<%@ include file="../shared/_header.jsp"%>
<div class="data-wrap case">
    <div class="data-tool clearfix">

        <div class="pull-left form-inline ">
            <button type="button" class="btn btn-default" data-modal="/role/roleEdit" data- data-title="新增角色" data-width="452" data-height="385">
            <span class="glyphicon"></span> 新增角色
            </button>
        </div>

        <div class="pull-right">
            <form class="form-inline" id="formSearch">
                <label class="m15_l">状态</label>
                <select class="form-control" name="status">
                    <option value="">全部</option>
                    <c:forEach items="${statusEnum}" var="item">
                        <option value="${item.key}">${item.value}</option>
                    </c:forEach>
                </select>
                <label class="m15_l">用户账号</label>
                <input class="form-control wd150" name="EASName" type="text">
                <button type="button" class="btn btn-default m5_l" id="btnSearch" onclick="return doSearch();">搜索</button>
            </form>
        </div>

    </div>
    <div class="paging"></div>
</div>
<script type="text/javascript">
    $(function () {
        UI.DataAutoHeight();
        doSearch();
    });
    function doSearch() {
        UI.Pager(".paging", { ajax: { url: '/role/indexQuery' } });
    }
    function Tip_success(word) {
        UI.Tip_success(word);
    }
</script>
<%--页尾--%>
<%@ include file="../shared/_footer.jsp"%>