<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="statusEnum" value="${statusEnum}"></c:set>
<%--页头--%>
<%@ include file="../shared/_header.jsp"%>
<style>
    .usermenu {background-color: #f5f5f5;padding: 5px 20px;overflow-x: hidden;overflow-y: auto;height: 300px;}
</style>
<section class="container-fluid" style="background-color: white;">

    <ul class="nav nav-tabs m15_t" id="myTab">
        <li class="active"><a href="#home" data-toggle="tab">基本信息</a></li>
        <li><a href="#permissions" data-toggle="tab">角色权限</a></li>
    </ul>
    <form class="form-horizontal m15_t" id="form">
        <div class="tab-content">
            <input type="hidden" id="sysno" name="sysno" value="${model.sysno}">
            <div class="tab-pane fade in active" id="home">
                <div class="form-group">
                    <label class="wd100 control-label"><span class="WdateFmtErr">*</span>角色名称：</label>
                    <div class="wd250 m15_l">
                        <input class="form-control" type="text" name="name" maxlength="50" value="${model.name}">
                    </div>
                </div>
                <div class="form-group">
                    <label class="wd100 control-label"><span class="WdateFmtErr">*</span>角色描述：</label>
                    <div class="wd250 m15_l">
                        <textarea class="form-control" id="description" name="description" rows="5">${model.description}</textarea>
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
            <!--菜单-->
            <div class="tab-pane fade" id="permissions">
                <div class="form-group">
                    <div class="usermenu">
                        <div class="zTreeDemoBackground left">
                            <ul id="ztree" class="ztree"></ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</section>
<link href="/theme/plugins/ZTree/zTreeStyle.css" rel="stylesheet" />
<link href="/theme/plugins/icheck/skins/all.css" rel="stylesheet" />

<script type="text/javascript" src="/theme/plugins/validate/jquery.validate.min.js"></script>
<script type="text/javascript" src=/theme/plugins/validate/jquery.validate.addmethod.js"></script>
<script type="text/javascript" src="/theme/plugins/ZTree/jquery.ztree.all.js"></script>
<script type="text/javascript">
    var validator = null;
    var setting = {
        check: {
            enable: true,
            chkboxType: { "Y": "p", "N": "ps" }
        },
        data: {
            simpleData: {
                enable: true,
                idKey: "id",
                pIdKey: "pId",
                rootPId: 0
            }
        }
    };

    $(document).ready(function() {

        validator = UI.Validator({
            formObj: $("#form"),
            rules: {
                name: {
                    required: true,
                    maxlength: 50
                }
            },
            messages: {
                name: {
                    required: "名称不能为空",
                    rangelength: "长度必须介于 3 和 20 之间",
                }
            },
        });

        InitZTree();
    });
    var ztree;

    //初始化ZTree
    function InitZTree() {

        var sysno = $("input[name='sysno']").val();

        $.ajax({
            url: '/auth/getMenuPermissionTree',
            type: "POST",
            data: { roleSysNo: sysno },
            //dataType: 'json',
            traditional: true,
            success: function(response) {
                if (response != null) {
                    //更具返回结果初始化zTree
                    ztree = $.fn.zTree.init($("#ztree"), setting, response);
                    //默认为收起所以节点
                    ztree.ExpandAllStatus = false;
                }
            },
            error: function(httpRequest, txtStatus, error) {
                //alert(error);
            }
        });
    }

    function save() {

        if (!validator.form()) {
            return false;
        }

        var sysno = $("input[name='sysno']").val();

        var selectedMenuNodes = ztree.getCheckedNodes(true);

        var authorizeArray = new Array();
        if (selectedMenuNodes.length > 0) {
            for (var i = 0; i < selectedMenuNodes.length; i++) {

                var authorizeSysNo = selectedMenuNodes[i].id.replace("m_", "").replace("p_", "");
                var authorizeType = selectedMenuNodes[i].nodetype;

                var authorize = {
                    "roleSysNo": sysno,
                    "authorizeSysNo": authorizeSysNo,
                    "authorizeType": authorizeType,
                };
                authorizeArray.push(authorize);
            }
        }

        var data = {
            "sysno": sysno,
            "name":$("input[name='name']").val(),
            "description":$("textarea[name='description']").val(),
            "status":$('input[name="status"]:checked').val(),
            "authorize":JSON.stringify(authorizeArray)
        };

        $.ajax({
            url: '/role/roleSave',
            type: 'POST',
            //data:{"role":JSON.stringify(role),"authorize":JSON.stringify(authorizeArray)},
            data: data,
            //contentType: "application/json",
            dataType: "json",
            success: function(res) {
                if (res.status) {
                    UI.Dialog().close();
                    UI.Dialog().opener.doSearch();
                    UI.Dialog().opener.Tip_success("操作成功！");
                } else {
                    UI.Tip_warning("操作失败！" + res.message);
                }
            },
            error: function(json) {
                UI.Tip_warning("操作失败！请查看网络，请重试。");
            }
        });
    }
</script>
<%--页尾--%>
<%@ include file="../shared/_footer.jsp"%>