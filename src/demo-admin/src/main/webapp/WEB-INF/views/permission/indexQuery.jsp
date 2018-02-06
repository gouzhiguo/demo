<%@ page import="demo.model.enums.StatusEnum" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="statusEnum" value="${statusEnum}"></c:set>
<div class="data-head">
    <table class="table">
        <thead>
        <tr>
            <th width="120">权限名称</th>
            <th width="120">权限代码</th>
            <th class="t_l">描述</th>
            <th width="100">状态</th>
            <th width="150">操作</th>
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
                            <td width="120">${item.name}</td>
                            <td width="120">${item.code}</td>
                            <td class="t_l">${item.description}</td>
                            <td width="100">${statusEnum.get(item.status)}</td>
                            <td width="150">
                                <c:choose>
                                    <c:when test="${item.status == StatusEnum.DISABLED.getStatus()}">
                                        <a class="btn btn-primary" data-callback="doSearch()" data-confirm="确定要启用该权限？" data-href="/permission/updatePermissionStatus?sysNo=${item.sysno}&status=${StatusEnum.ENABLED.getStatus()}">启用</a>
                                    </c:when>
                                    <c:when test="${item.status == StatusEnum.ENABLED.getStatus()}">
                                        <a class="btn btn-danger" data-callback="doSearch()" data-confirm="确定要禁用该权限？" data-href="/permission/updatePermissionStatus?sysNo=${item.sysno}&status=${StatusEnum.DISABLED.getStatus()}">禁用</a>
                                    </c:when>
                                </c:choose>
                                <button type="button" class="btn btn-default" data-modal="/permission/permissionEdit?sysNo=${item.sysno}" data-title="编辑权限" data-width="400" data-height="300">
                                    <span class="glyphicon glyphicon-edit"></span> 编辑
                                </button>
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
<input type="hidden" id="TotalCount" value="${recordCount}" />