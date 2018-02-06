<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--页头--%>
<%@ include file="../shared/_header.jsp"%>
<!--fram-wrap start-->
<div class="fram-wrap clearfix">
    <!--fram-aside start-->
    <aside class="fram-aside">
        <h3 class="fram-logo"><span>LOGA</span><span>千年</span></h3>
        <div id="side_menu" class="side-menu">
            <ul id="side_ul" class="side-ul">
                <li class="fir-li">
                    <a pageid="a5"><i class="iconfont icon-briefcase"></i><font>系统管理</font></a>
                    <ul class="sec-ul">
                        <li><a pageid="a5_9" targetpage="/permission/index">权限管理</a></li>
                        <li><a pageid="a5_10" targetpage="/menu/index">菜单管理</a></li>
                        <li><a pageid="a5_11" targetpage="/user/index">用户管理</a></li>
                        <li><a pageid="a5_12" targetpage="/role/index">角色管理</a></li>
                    </ul>
                </li>
                <li class="fir-li">
                    <a pageid="a5"><i class="iconfont icon-briefcase"></i><font>demo</font></a>
                    <ul class="sec-ul">
                        <li><a pageid="a5_13" targetpage="/subject/index">专题管理</a></li>
                        <li><a pageid="a5_14" targetpage="/crm/Customer">会员管理</a></li>
                        <li><a pageid="a5_15" targetpage="/fore/Forum">版本管理</a></li>
                        <li><a pageid="a5_16" targetpage="/fore/Wiki">百科管理</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </aside>
    <!--fram-aside end-->
    <!--fram-article start-->
    <article class="fram-article open">
        <!--ftop-wrap start-->
        <header class="ftop-wrap clearfix">
            <dl class="ftop-dl">
                <dt class="ftop-dt"><a id="menu_pack" href="javascript:void(0)"><i class="iconfont icon-menu icon-pack"></i></a></dt>
                <dd class="ftop-dd">
                    <a href="javascript:void(0)"><i class="iconfont icon-user"></i><span>苟治国</span></a>
                    <a href="/Account/Logout"><i class="iconfont icon-off"></i></a>
                </dd>
            </dl>
        </header>
        <!--ftop-wrap end-->
        <!--fscr-menu start-->
        <section id="fscr_menu" class="fscr-menu clearfix">
            <div class="fscr-act">
                <a id="clearNav" href="javascript:void(0)"><i class="iconfont icon-clear"></i></a>
                <a id="refreshbox" href="javascript:void(0)"><i class="iconfont icon-repeat"></i></a>
            </div>
            <div class="fscr-nav" id="fscr_nav">
                <ul id="fscr_ul">
                    <li class="menuon" pageid="a1"><a>首页</a></li>
                </ul>
                <div class="fscr-arrow">
                    <a id="left_scroll" href="javascript:void(0)"><i class="iconfont icon-menu-left"></i></a>
                    <a id="right_scroll" href="javascript:void(0)"><i class="iconfont icon-menu-right"></i></a>
                </div>
            </div>
        </section>
        <!--fscr-menu end-->
        <!--iframe-wrap start-->
        <section id="iframewrap" class="iframe-wrap">
            <iframe class="show" width="100%" pageid="a1" frameborder="0" scrolling-x="no" id="ifmamedefault" src="/home/main"></iframe>
        </section>
        <!--iframe-wrap end-->
    </article>
    <!--fram-article end-->
</div>
<!--fram-wrap start-->
<%--页尾--%>
<%@ include file="../shared/_footer.jsp"%>