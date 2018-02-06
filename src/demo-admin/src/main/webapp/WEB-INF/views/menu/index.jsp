<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="statusEnum" value="${statusEnum}"></c:set>
<c:set var="isNavEnum" value="${isNavEnum}"></c:set>
<%--页头--%>
<%@ include file="../shared/_header.jsp"%>
<link href="/theme/plugins/ZTree/zTreeStyle.css" rel="stylesheet" />
<link href="/theme/plugins/icheck/skins/all.css" rel="stylesheet" />
<div class="container-fluid case">
    <div class="row">
        <div class="col-md-4">
            <div class="panel panel-default m15_t">
                <div class="panel-heading">
                    <h3 class="panel-title">菜单</h3>
                </div>
                <div class="panel-body">
                    <div>
                        <a class="btn btn-primary btn-radius btn-xs" id="addSibling" onclick="return false;"><span class="glyphicon glyphicon-plus"></span> 增加父节点</a>
                        <a class="btn btn-primary btn-radius btn-xs" id="addLeaf" onclick="return false;"><span class="glyphicon glyphicon-plus"></span> 增加子节点</a>
                    </div>
                    <div class="zTreeDemoBackground">
                        <ul id="ztree" class="ztree"></ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-8">
            <div class="panel panel-default m15_t">
                <ul class="nav nav-tabs m15_t" id="myTab">
                    <li class="active"><a href="#basicInfo" data-toggle="tab">基本信息</a></li>
                    <li><a href="#permissions" data-toggle="tab">菜单权限</a></li>
                </ul>
                <div class="panel-body">
                    <form id="form">
                        <div class="tab-content">
                            <input type="hidden" name="sysNo" />
                            <div class="form-horizontal tab-pane fade in active" id="basicInfo">
                                <div class="form-group">
                                    <label class="wd100 control-label"><span class="WdateFmtErr">*</span>菜单名称：</label>
                                    <div class="wd250 m15_l">
                                        <input class="form-control" type="text" name="name" maxlength="50" value="${isNavEnum.DISPLAY.getStatus()}">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="wd100 control-label">父级菜单：</label>
                                    <div class="wd250 m15_l">
                                        <select class="form-control input-sm wd240" name="parentSysNo" style="display: inline-block; width: auto;">
                                            <option value="0">根目录</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="wd100 control-label">菜单地址：</label>
                                    <div class="wd250 m15_l">
                                        <input class="form-control wd240" type="text" name="url" maxlength="100" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="wd100 control-label"><span class="WdateFmtErr">*</span>显示顺序：</label>
                                    <div class="wd250 m15_l">
                                        <input class="form-control wd240" type="text" name="displayOrder" maxlength="4" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="wd100 control-label">导航栏显示：</label>
                                    <div class="wd250 m15_l">
                                        <input type="checkbox" name="isNav" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="wd100 control-label">状态：</label>
                                    <div class="wd250 m15_l">
                                        <input type="checkbox" name="status" />
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="permissions">
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <button id="menuPermission" type="button" class="btn btn-success" data-href="/menu/permission" data-title="权限选择" data-width="600" data-height="500" onclick="return view(this)"><span class="glyphicon glyphicon-plus-sign"></span>添加</button>
                                    </div>
                                    <table class="table table-bordered table-hover privileges">
                                        <thead>
                                        <tr>
                                            <th class="t_l">权限名称</th>
                                            <th class="t_l wd120">权限代码</th>
                                            <th class="t_l wd150">备注</th>
                                            <th class="t_c wd75">操作</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr class="noRecord">
                                            <td colspan="4">暂无记录！</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="text-center">
                                <button type="button" class="btn btn-primary User0002" onclick="return save();">
                                    <span class="glyphicon"></span> 保存
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="/theme/plugins/validate/jquery.validate.min.js"></script>
<script type="text/javascript" src="/theme/plugins/validate/jquery.validate.addmethod.js"></script>
<script type="text/javascript" src="/theme/plugins/ZTree/jquery.ztree.all.js"></script>
<script type="text/javascript" src="/theme/plugins/doT/doT.min.js"></script>

<script type="text/javascript" src="/theme/plugins/icheck/icheck-init.js"></script>
<script type="text/javascript" src="/theme/plugins/icheck/jquery.icheck.js"></script>

<script type="text/html" id="menuPermissionTemplate">
    {{? it && it.length>0}}
    {{ for(var prop in it) { }}
    <tr>
        <td class="t_l">
            <input style="display: none" name="permissionSysNo" type="checkbox" value="{{=it[prop]['sysno']}}">
            {{=it[prop]['name']}}
        </td>
        <td class="t_l wd120">{{=it[prop]['code']}}</td>
        <td class="t_l wd150">{{=it[prop]['description'] || ''}}</td>
        <td class="t_c wd75"><button type="button" class="btn btn-danger" onclick=" removeRow(this) "><span class="glyphicon glyphicon-trash"></span>删除</button></td>
    </tr>
    {{ } }}
    {{??}}
    <tr class="noRecord">
        <td colspan="4">暂无记录！</td>
    </tr>
    {{?}}
</script>
<script type="text/html" id="noRecordTemplate">
    <tr class="noRecord">
        <td colspan="4">暂无记录！</td>
    </tr>
</script>
<script type="text/javascript">

    var setting = {
        async: {
            enable: false,
            url: "/menu/getMenuBySysNo",
            autoParam: ["id"]
        },
        check: {
            enable: false
        },
        view: {
            addHoverDom: addHoverDom,
            removeHoverDom: removeHoverDom,
            autoCancelSelected: false,
            showIcon: true
        },
        data: {
            simpleData: {
                enable: true,
                idKey: "id",
                pIdKey: "pid",
                rootPId: 0
            }
        },
        callback: {
            beforeClick: beforeClick,
            onClick: onClick,
            onAsyncSuccess: onAsyncSuccess
        }
    };

    function beforeClick(treeId, treeNode, clickFlag) {
    }

    function onClick(e, treeId, treeNode) {

        selectedNode = treeNode;

        $.ajax({
            url: '/menu/getMenuBySysNo',
            type: "POST",
            data: { sysNo: treeNode.id },
            dataType: "json",
            success: function(res) {
                if (res.status) {
                    $("input[name='sysNo']").val(res.data.sysno);
                    $("input[name='name']").val(res.data.name);
                    $("select[name='parentSysNo']").val(res.data.parentsysno);
                    $("input[name='url']").val(res.data.url);
                    $("input[name='displayOrder']").val(res.data.displayorder);
                    $("input[name='isNav']").iCheck(res.data.isnav == '${IsNavEnum.DISPLAY.getStatus()}' ? "check" : "uncheck");
                    $("input[name='status']").iCheck(res.data.status == '${StatusEnum.ENABLED.getStatus()}' ? "check" : "uncheck");
                    var menuPermissionText = doT.template($("#menuPermissionTemplate").text());
                    $("table tbody").html(menuPermissionText(res.data.permissionVoList));

                }
            }
        });
    }

    function insertRow(obj) {
        var menuPermissionText = doT.template($("#menuPermissionTemplate").text());
        $("table.table > tbody > tr.noRecord").remove();
        $("table tbody").append(menuPermissionText(obj));
    }

    function removeRow(obj) {

        var length = $("table.table > tbody > tr").length;

        $(obj).parent().parent().remove();

        if (length == 1) {
            var noRecordText = doT.template($("#noRecordTemplate").text());
            $("table tbody").append(noRecordText());
        }

    }

    function menuTreeList(id) {

        $.ajax({
            url: '/menu/getMenuParentSysNo',
            type: "POST",
            data: { parentSysNo: 0 },
            dataType: "json",
            success: function(res) {
                if (res.status) {
                    parentSysNo.empty();
                    parentSysNo.append("<option value='0'>请选择</option>");
                    $.each(res.data, function(i, item) {
                        parentSysNo.append("<option value='" + item.id + "'>" + item.name + "</option >");
                    });
                    if (id != null) {
                        $("select[name='parentSysNo']").val(id);
                    }
                } else {
                }
            }
        });
    }

    var selectedNode = null;

    var validator = null;

    var parentSysNo = $("select[name='parentSysNo']");

    $(document).ready(function() {
        //表单验证初始配置
        validator = UI.Validator({
            formObj: $("#form"),
            rules: {
                name: {
                    required: true,
                    maxlength: 50
                },
                displayOrder: {
                    required: true,
                    IsPositiveInteger: true
                }
            },
            messages: {
                name: {
                    required: "菜单名称不能为空",
                    rangelength: "长度必须介于 3 和 20 之间",
                },
                displayOrder: {
                    required: "排序不能为空",
                    rangelength: "只能为正整数",
                }
            }
        });

        InitZTree(null);
        menuTreeList(null);
        $("#addSibling").bind("click", { isParent: false }, addSibling);
        $("#addLeaf").bind("click", { isParent: false }, addLeaf);
    });

    //初始化ZTree
    function InitZTree(selectedNode) {
        $.ajax({
            url: '/menu/getMenuList',
            type: 'POST',
            data: {},
            dataType: 'json',
            success: function(response) {
                if (response != null) {
                    //更具返回结果初始化zTree
                    var ztree = $.fn.zTree.init($("#ztree"), setting, response);
                    //默认为收起所以节点
                    ztree.ExpandAllStatus = false;
                    if (selectedNode != null) {
                        ztree.selectNode(selectedNode, false);
                    }
                }
            },
            error: function(httpRequest, txtStatus, error) {
                //alert(error);
            }
        });
    }

    //添加同级节点
    function addSibling(e) {
        var ztree = $.fn.zTree.getZTreeObj("ztree"),
            isParent = e.data.isParent,
            nodes = ztree.getSelectedNodes();
        selectedNode = nodes[0];

        if (ztree.getNodeByParam("id", "-1") != null) {

            var currentNode = ztree.getNodeByParam("id", "-1");

            UI.Confirm({
                content: "是否要放弃新添加的菜单？",
                ok: function() {
                    ztree.removeNode(currentNode);

                    reset();
                }
            });

        } else {
            selectedNode = ztree.addNodes(null, { id: -1, pId: 0, isParent: isParent, name: "增加的父节点" });
            ztree.selectNode(selectedNode, false);

            selectedNode = selectedNode[0];
            reset();
        }
    }

    //添加子节点
    function addLeaf(e) {

        var ztree = $.fn.zTree.getZTreeObj("ztree"),
            isParent = e.data.isParent,
            nodes = ztree.getSelectedNodes();
        selectedNode = nodes[0];

        if (nodes.length <= 0) {
            UI.Tip_danger("请选择节点！");
            return false;
        }
        if (ztree.getNodeByParam("id", "-1") != null) {

            UI.Confirm({
                content: "是否要放弃新添加的菜单？",
                ok: function() {

                    var currentTreeNode = ztree.getNodeByParam("id", "-1");
                    if (currentTreeNode) {

                        ztree.removeNode(currentTreeNode);

                        reset();
                    }
                }
            });

        } else {
            if (selectedNode) {
                selectedNode = ztree.addNodes(selectedNode, { id: -1, pId: selectedNode.id, isParent: isParent, name: "增加的子节点" });
                if (selectedNode) {
                    ztree.selectNode(selectedNode);
                    selectedNode = selectedNode[0];
                    reset();
                }
            }
        }
    }

    //清除表单
    function reset() {

        $("input[name='sysNo']").val(0);
        $("input[name='name']").val('');
        if (selectedNode && selectedNode.parentTId != null) {
            var ztree = $.fn.zTree.getZTreeObj("ztree"),
                node = ztree.getNodeByTId(selectedNode.parentTId);
            $("select[name='parentSysNo']").val(node.id);
        } else {
            $("select[name='parentSysNo']").val(0);
        }
        $("input[name='url']").val('');
        $("input[name='displayOrder']").val('');
        $("input[name='isNav']").iCheck("uncheck");
        $("input[name='status']").iCheck("uncheck");
    }

    function addHoverDom(treeId, treeNode) {
        var obj = $("#" + treeNode.tId + "_span");

        if (treeNode.editNameFlag || $("#addBtn_" + treeNode.id).length > 0) {
            return;
        }

        obj.after("<span class='btncj removecj' id='addBtn_" + treeNode.id + "' title='删除' onfocus='this.blur();'></span>");
        //删除节点
        var ebtn = $("#addBtn_" + treeNode.id);
        if (ebtn)
            ebtn.bind("click", function() {
                var zTree = $.fn.zTree.getZTreeObj("ztree");
                if (treeNode) {
                    alert(1);
                } else {
                    alert("叶子节点被锁定，无法编辑子节点");
                }
                return false;
            });
    }

    //隐藏图标
    function removeHoverDom(treeId, treeNode) {
        $("#addBtn_" + treeNode.id).unbind().remove();
        $("#editBtn_" + treeNode.id).unbind().remove();
        $("#treeDemo_" + treeNode.id + "_remove").unbind().remove();
    }

    //zTree异步加载成功的事件回调函数
    function onAsyncSuccess(event, treeId, treeNode) {
        var ztree = $.fn.zTree.getZTreeObj("ztree");

        var node = ztree.getNodeByParam("id", selectedNode.id, null);

        ztree.selectNode(node);
    }

    function save() {
        //交叉自定义验证
        if (!validator.form()) {
            return false;
        }
        var privileges = [];
        $("table.privileges > tbody > tr").each(function(index) {
            var sysNo = $(this).find("input[name='permissionSysNo']").val();
            if (sysNo != null)
                privileges.push(sysNo);
        });

        var data = {
            "sysno":$("input[name='sysNo']").val(),
            "name" : $("input[name='name']").val(),
            "parentsysno" : $("select[name='parentSysNo']").val(),
            "url" : $("input[name='url']").val(),
            "displayorder" : $("input[name='displayOrder']").val(),
            //isNav = $("input[name='isNav']").prop('checked') ? @(IsNav.显示.GetHashCode()) : @(IsNav.不显示.GetHashCode()),
            //status = $("input[name='status']").prop('checked') ? @(MenuStatus.启用.GetHashCode()) : @(MenuStatus.禁用.GetHashCode()),
            "privileges":privileges.toString()
        };
        $.ajax({
            url: '/menu/saveMenu',
            type: "POST",
            data: data,
            dataType: 'json',
            //traditional:true,
            success: function(res) {
                if (res.status) {
                    var ztree = $.fn.zTree.getZTreeObj("ztree");
                    ztree.setting.async.enable = true;
                    if (selectedNode && selectedNode.parentTId != null && parseInt(selectedNode.pId) === parseInt(data.parentSysNo)) {
                        ztree.reAsyncChildNodes(ztree.getNodeByTId(selectedNode.parentTId), "refresh", true);
                    } else {
                        ztree.reAsyncChildNodes(null, "refresh", true);
                    }
                    menuTreeList(data.parentSysNo);
                    UI.Tip_success(res.message);
                } else {
                    UI.Tip_success(res.message);
                }
            }
        });
    }

    //查看
    function view(obj) {

        var modal = $(obj);

        var url = modal.data("href");

        var menuSysNo = $("input[name='sysNo']").val();

        if ($.vailCenter.isNullOrEmptySpance(menuSysNo)) {
            UI.Tip_warning("选择菜单！");
            return;
        }
        url += "?menuSysNo=" + menuSysNo;

        UI.DialogOpen(url, {
            title: modal.data("title"),
            width: modal.data("width"),
            height: modal.data("height"),
            init: function() {
                this.button(
                    {
                        name: '关闭'
                    }
                );
            },
        });
    }
</script>
<%--页尾--%>
<%@ include file="../shared/_footer.jsp"%>