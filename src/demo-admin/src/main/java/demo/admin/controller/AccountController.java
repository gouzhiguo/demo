package demo.admin.controller;

import demo.core.CookieUtil;
import demo.core.JsonUtil;
import demo.core.MD5Util;
import demo.model.JResult;
import demo.model.output.bs.auth.Ticket;
import demo.model.output.bs.auth.TicketUser;
import demo.model.para.bs.AuthorizePara;
import demo.model.para.bs.LoginPara;
import demo.model.table.bs.BsAuthorize;
import demo.model.table.bs.BsPermission;
import demo.model.table.bs.BsUser;
import demo.service.interfaces.bs.AuthorizeService;
import demo.service.interfaces.bs.PermissionService;
import demo.service.interfaces.bs.UserService;
import demo.service.interfaces.core.EhcacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

/**
 * 登录、注销控制器
 * @author 苟治国 创建
 */
@Controller
@RequestMapping("/account")
public class AccountController {
    /**
     * 用户
     */
    @Autowired
    private UserService userService;

    /**
     * 登录
     * @return
     */
    @RequestMapping("/login")
    public String login(){
        return "account/login";
    }

    /**
     * 更新状态
     * @param para
     * @return JResult
     * @author 苟治国 创建
     */
    @RequestMapping(value = "/userLogin",method = {RequestMethod.POST})
    @ResponseBody
    public JResult login(LoginPara para,HttpServletResponse response){

        JResult result = new JResult();
        result.setStatus(false);

        try{
            BsUser user = userService.getByAccount(para.getAccount());
            if(null==user){
                throw new Exception("用户不存在");
            }
            Ticket ticket = new Ticket();
            ticket.setSysNo(user.getSysno());
            ticket.setAccount(user.getAccount());
            ticket.setName(user.getName());

            String ticketMd5 = MD5Util.md5Password(JsonUtil.objToJson(ticket));

            CookieUtil.setCookie(response,"sysno",user.getSysno().toString(),24*60*60,null);
            CookieUtil.setCookie(response,"ticket", ticketMd5,24*60*60,null);

            result.setStatus(true);
            result.setMessage("登录成功");
        }catch (Exception ex){
            result.setMessage(ex.getMessage());
            ex.printStackTrace();
        }

        return result;

    }

    /**
     * 退出
     * @return view
     * @author 苟治国 创建
     */
    @RequestMapping("/timeout")
    public String timeout(){
        return "account/login";
    }
}
