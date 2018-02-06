;$(function(){
	var zTreeObj;
	// zTree 的参数配置
	var setting = {
	    view: {
			addHoverDom: addHoverDom,
			removeHoverDom: removeHoverDom,
			autoCancelSelected: false,
			showIcon: true,
			nameIsHTML: true
		},
		edit: {
			enable: true,
			showRemoveBtn: true,
			showRenameBtn: false,
			removeTitle: "删除",
	        renameTitle: "删除",
			checkable: true
		},
		check: {
			enable: true
		},
		data: {
			simpleData: {
				enable: true
			}
		},
		callback:{
			onNodeCreated:function(){
				//alert('add');
			},
			onRename:function(){
				//alert('edit')
			},
			onRemove:function(){
				//alert('delete')
			}
		}
	};
	// zTree 的数据属性
	var zNodes =[
		{ id:1, pId:0, name:"用户管理", open:true},
		{ id:11, pId:1, name:"新增用户"},
		{ id:12, pId:1, name:"编辑用户"},
		{ id:2, pId:0, name:"地区管理", open:true},
		{ id:21, pId:2, name:"新增用户"},
		{ id:22, pId:2, name:"编辑用户"},
		{ id:3, pId:0, name:"其他功能", open:true,s_not:true},
		{ id:31, pId:3, name:"子功能",s_audit:true,s_edit:true,s_update:true,s_me:true},
		{ id:32, pId:3, name:"子功能"},
		{ id:4, pId:0, name:"其他功1能"},
		{ id:41, pId:4, name:"子功能"},
		{ id:42, pId:4, name:"子功能"}
	];
	
	
	var newCount = 1;
	function addHoverDom(treeId, treeNode) {
		var sObj = $("#" + treeNode.tId + "_span");
		if (treeNode.editNameFlag || $("#addBtn_"+treeNode.id).length>0) return;
		var addStr = "<span class='btncj addcj' id='addBtn_" + treeNode.id
			+ "' title='添加' onfocus='this.blur();'></span>"+"<span class='btncj editcj' id='editBtn_" + treeNode.id
			+ "' title='编辑' onfocus='this.blur();'></span>"+"<span class='btncj visiblecj' id='visibleBtn_" + treeNode.id
			+ "' title='显示与隐藏' onfocus='this.blur();'></span>";
		sObj.after(addStr);
		
		//添加节点
		var abtn = $("#addBtn_"+treeNode.id);
		if (abtn) abtn.bind("click", function(){
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			treeNodedd=zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, name:"输入新增模块名称"});
			if (treeNodedd) {
				zTree.editName(treeNodedd[0]);
			} else {
				alert("叶子节点被锁定，无法增加子节点");
			}
			return false;
		});
		
		
		
		
		
		//编辑节点
		var ebtn = $("#editBtn_"+treeNode.id);
		if (ebtn) ebtn.bind("click", function(){
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			if (treeNode) {
				zTree.editName(treeNode);
			} else {
				alert("叶子节点被锁定，无法编辑子节点");
			}
			return false;
		});
		
		//隐藏节点
		var  vbtn = $("#visibleBtn_"+treeNode.id);
		if (vbtn) vbtn.bind("click", function (e) {
			e.cancelBubble;
			$(this).toggleClass('canSee');
			if ($(this).hasClass('canSee')) {
				$(this).addClass('unvisiblecj').removeClass('visiblecj');
			} else {
				$(this).addClass('visiblecj').removeClass('unvisiblecj');
			}
			return false;
		});
	}
	
	//隐藏图标
	function removeHoverDom(treeId, treeNode) {
		$("#addBtn_"+treeNode.id).unbind().remove();
		$("#editBtn_"+treeNode.id).unbind().remove();
		$("#treeDemo_"+treeNode.id+"_remove").unbind().remove();
		$("#visibleBtn_"+treeNode.id).unbind().remove();
	}		
			
		
	//添加父节点
	function addParent(e) {
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		//isParent = e.data.isParent,
		treeNodedd=zTree.addNodes(null, {id:(100 + newCount), pId:0,  name:"输入新增模块名称"});
		if (treeNodedd) {
			zTree.editName(treeNodedd[0]);
		} else {
			alert("叶子节点被锁定，无法增加子节点");
		}
		return false;
	};
	
	
	//载入
	$.fn.zTree.init($("#treeDemo"), setting, zNodes);
	$.fn.zTree.init($("#treeDemo2"), setting, zNodes);
	$.fn.zTree.init($("#treeDemo3"), setting, zNodes);
	//添加父节点
	$("#addParent").bind("click", {isParent:true}, addParent);
	
});