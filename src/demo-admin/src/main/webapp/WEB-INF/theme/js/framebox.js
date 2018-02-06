$(function(){

    /*左边导航*/
	$(".side-ul>li.fir-li").hover(function(){
		$(this).children("ul").show();
	},function(){
		$(this).children("ul").hide();
	});
	$(".sec-ul").hover(function(){
		$(this).prev("a").addClass("active");
	},function(){
		$(this).prev("a").removeClass("active");
	});
    $(".side-ul li").click(function(){		
		$(this).addClass("active").siblings().removeClass("active");  
    });
	
    $(".sec-ul li").click(function(){		
		$(this).parent().parent().addClass("active").siblings(".side-ul li").removeClass("active");		
    });
	

	/*左边菜单显示隐藏*/
	var navobj=$("#side_menu");
	var AObj=$("#side_ul > li > a");
	var popObj=$("#side_ul li");
	var fram_wrapperObj=$("#iframewrap");
	var winH=$(window).height();//第一次加载页面时
	
	NavHauto();
	$(window).resize(function(){
		NavHauto();
	});
	
	function NavHauto() {
		var winH=$(window).height();
		var fram_showObj=fram_wrapperObj.children("iframe");
		fram_wrapperObj.height(winH-110);//右边Iframe
		fram_showObj.height(winH-110);//右边Iframe
		navobj.height(winH-70);//左边导航
	}

	
	/*左边菜单点击加载页面*/
	popObj.find('a').click(function(){
		//点击加载页面
		var creatpageid=$(this).attr("pageid");
		var targetpage=$(this).attr("targetpage");
		var currenttxt=$(this).text();
		CreatTabEvent(creatpageid,targetpage,currenttxt);
	});


	/*RefreshboxObj当前刷新*/
	var RefreshboxObj=$('#refreshbox');
	RefreshboxObj.click(function(){
		$("#iframewrap iframe.show").each(function () {
			$(this).attr('src', $(this).attr('src'));
			return;
		});
	});

	
	/*右边滑动条LI(首页)点击切换*/
	$("#fscr_ul > li:first").click(function(){
		if($(this).hasClass('menuon')){
			return;
		}else{
			$("#fscr_ul>li").removeClass('menuon');
			$(this).addClass('menuon');
			$("#iframewrap iframe.show").removeClass("show").addClass("hide");
			$("#ifmamedefault").removeClass("hide").addClass("show");
		}
	});	
		
		
	var RowScroll = new SellerScroll({
		container:"fscr_menu",
		con_nner:"fscr_nav",
		lButton: "left_scroll",
		rButton: "right_scroll", 
		oList: "fscr_ul", 
		showSum:2,
		showmun:1,
		direction:"left"
	}); //外div,内DIV,左arrow,右arrow,内UL,一次滑动数,显示个数
	
	//创建加载页面
	function CreatTabEvent(creatpageid,creaturl,creattext){
		
		//var BreadObj=$(".fram_bread");
		var fram_wrapperObj=$("#iframewrap");
		var fscr_ulObj=$("#fscr_ul");
		
		//BreadObj.text(creattext);//设置当前位置
		if(creaturl==null) return;
		var winH=$(window).height();//第一次加载页面时
		
		var iframe_i=fram_wrapperObj.children("iframe[pageid="+creatpageid+"]")
		fram_wrapperObj.children("iframe.show").removeClass("show").addClass("hide");
		
		if(fram_wrapperObj.children("iframe[pageid="+creatpageid+"]").length>0){
			
			var carousel_li=$("#fscr_ul > li[pageid="+creatpageid+"]");
			fscr_ulObj.find('li').removeClass("menuon");
			carousel_li.addClass("menuon");
			iframe_i.removeClass("hide").addClass("show");
			var currliLift=carousel_li.position().left;
			var carouselLift=fscr_ulObj.position().left;
			var carinnerW=$('#fscr_nav').width();
			
			//当前选项卡保证在可显示区域
			if(Math.abs(carouselLift)+25 > currliLift){
				fscr_ulObj.css('left',-(currliLift)+'px')
			}else if(Math.abs(carouselLift)+carinnerW-25 < currliLift){
				fscr_ulObj.css("left", carinnerW-(currliLift+carousel_li.width()+1)+"px");
			}
			
		}else{
			
			$("#fscr_ul>li.menuon").removeClass("menuon");
			$("#fscr_ul").append("<li class='tabli menuon' pageid='"+creatpageid+"'><a>"+creattext+"</a><span class='delx'></span></li>");
			
			//增加li删除事件
			$("#fscr_ul > li.tabli").off();
			$("#fscr_ul > li.tabli").on("click",".delx",function(e){
					
					DelectEvent($(this).parent("li.tabli"));
					//冒泡
					return false;
					
			});
			
			/*右边滑动条LI点击切换*/
			$("#fscr_ul > li").click(function(){
				
				if($(this).hasClass('menuon')){
					return;
				}else{
					$("#fscr_ul>li").removeClass('menuon');
					$(this).addClass('menuon');
					var creatpageid=$(this).attr("pageid");
					$("#iframewrap iframe.show").removeClass("show").addClass("hide");
					$("#iframewrap iframe[pageid='"+creatpageid+"']").removeClass("hide").addClass("show");
					
				}});	
				
				RowScroll.iListSum+=1;
				RowScroll.Arrowshow();//自动左右滑动箭头
				
				var oIframe= "<iframe class='show' width='100%' height='"+(winH-109)+"'"
							 +"pageid='"+creatpageid+"' frameborder='0'"
							 +"scrolling-x='no' src='"+creaturl+"'></iframe>";
									 
				fram_wrapperObj.append(oIframe);
				
			}
		
	}	

	/*清除选项卡*/
	$(document).on('click','#clearNav',function(){
		SelectTab($('#fscr_nav ul li').eq(0));
		var navlen =  $('#fscr_nav ul li').length;
		if(navlen>1){
			for(var i= 1;i<navlen;i++){
				RemoveTab($('#fscr_nav ul li').eq(1));
			}
			$('#fscr_ul').css('left','0');
		}else{
			return
		}
	});	

    /*关闭选项时再打开一个选项卡*/
	function SelectTab(obj){
		//alert("prev");
		var creatpageid=obj.attr("pageid");
		//fscr_ul li显示隐藏
		$("#fscr_ul>li.menuon").removeClass("menuon");
		obj.addClass("menuon");
		//iframe显示隐藏
		$("#iframewrap iframe.show").removeClass("show").addClass("hide");
		$("#iframewrap iframe[pageid='"+creatpageid+"']").removeClass("hide").addClass("show");
	}
	
	
	/*移除选项卡和IFRAME*/
	function RemoveTab(obj){
		var iframe_i=$("#iframewrap > iframe[pageid="+obj.attr("pageid")+"]");
		obj.remove();
		iframe_i.remove();
		//RowScroll.moveMaxWidth = (RowScroll.moveMaxWidth-RowScroll.moveWidth);
		RowScroll.iListSum-=1;
		RowScroll.Arrowshow();
	}
	
	/*删除选项卡objdelx当前选项卡的关闭按钮对象*/
	function DelectEvent(objdelx){
		
		var objprev=objdelx.prev('.tabli');
		var objnext=objdelx.next('.tabli');
		if(objprev.length!=0){
			SelectTab(objprev);
			
		}else if(objnext.length!=0){
			SelectTab(objnext);
		}else{
			$("#fscr_ul>li:first").addClass('menuon'); //显示首页
			$("#ifmamedefault").removeClass("hide").addClass("show"); //显示首页ifmame
		}
		if(objdelx.text()!='首页'){
			RemoveTab(objdelx); //是不是第一个
		};
		
	}
	
	/*刷新另外的选项卡*/
	function RefreshOtherpage(creatpageid){
		var pageObj=$("#iframewrap iframe[pageid="+creatpageid+"]")
		pageObj.attr('src', pageObj.attr('src'));
		return;
	}


    /*移除页并刷新另外的选项卡*/
	function RemoveTabAndRefreshPageEvent(options) {
	    var opts = $.extend({
	        refreshPageId: "",
	        refreshPageUrl: "",
	        removePageId: "",
	        refreshOtherPageId: "",
	        isRefresh: false
	    }, options);

	    var refreshPageObj = $("#fscr_ul > li[pageid=" + opts.refreshPageId + "]");
	    if (opts.refreshPageId == "") {
	        opts.refreshPageId = getPageId(opts.refreshPageUrl);
	        refreshPageObj = $("#fscr_ul > li[pageid=" + opts.refreshPageId + "]");
	    }

	    var temObj = $("#fscr_ul").children(".menuon");
	    if (opts.removePageId != "") {
	        temObj = $("#fscr_ul > li[pageid=" + opts.removePageId + "]");
	    }

	    DelectEvent(temObj);
	    if (opts.refreshOtherPageId != "") {
	        RefreshOtherpage(opts.refreshOtherPageId);
	    }
	    if (refreshPageObj.length != 0) {
	        SelectTab(refreshPageObj);
	        RefreshOtherpage(opts.refreshPageId);
	    }

	    if (opts.isRefresh) {
	        RefreshboxObj.click();
	    }
	}

    //刷新列表
	function getPageId(url) {
	    var jqObj = $("#iframewrap iframe");
	    var pageId = "";
	    for (var i = 0; i < jqObj.length; i++) {
	        if ($.trim(url) == $.trim(jqObj.eq(i).attr("src"))) {
	            pageId = jqObj.eq(i).attr("pageid");
	            break;
	        }
	    }

	    return pageId;
	}

	/*slimscroll*/
	//	if($.fn.slimscroll){
	//		$("#side_menu").slimscroll({
	//			color:"rgba(255,255,255,0.4)",
	//			distance : '6px',
	//			overflow : 'initial'
	//		});
	//	}

    /*响应式显示隐藏*/	
	var menu_packObj=$("#menu_pack");
	var framL=$(".fram-aside");
	var framR=$(".fram-article")
	menu_packObj.click(function(){
		if(framL.hasClass("open")){
				framL.removeClass("open");
				window.setTimeout(function(){framL.removeClass("pack")},100);
				framR.addClass("open");
				$("#menu_pack i").addClass("icon-pack");
		}else{
				framL.addClass("open pack");
				
				framR.removeClass("open");
				$("#menu_pack i").removeClass("icon-pack");
		}
	});

    /*标签页创建新页面*/
	window.funCreatTabEvent = CreatTabEvent;

    /*移除页并刷新另外的选项卡*/
	window.funRemoveTabAndRefreshPageEvent = RemoveTabAndRefreshPageEvent;

    /*关闭当前选项卡*/
	function CloseCurrentTab() {

	    var temObj = $("#fscr_ul").children(".menuon");
	    DelectEvent(temObj);

	}
	window.funCloseCurrentTab = CloseCurrentTab;

    //刷新框架
	window.funRefresh = function () {
	    //刷新当前页面
	    window.location.reload();
	    //top.location.reload();
	    //或者下方刷新方法
	    //parent.location.reload()刷新父亲对象（用于框架）--需在iframe框架内使用
	    //opener.location.reload()刷新父窗口对象（用于单开窗口
	    //top.location.reload()刷新最顶端对象（用于多开窗口）
	};
});

