package demo.admin.controller;

import demo.core.CookieUtil;
import demo.core.JsonUtil;
import demo.model.JResult;
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
 * Created by Administrator on 2017/12/13.
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
     * 用户
     */
    @Autowired
    private AuthorizeService authorizeService;
    /**
     * 用户
     */
    @Autowired
    private PermissionService permissionService;
    /**
     * 缓存
     */
    @Autowired
    private EhcacheService ehcacheService;

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
            TicketUser ticketUser = new TicketUser();
            ticketUser.setSysNo(user.getSysno());
            ticketUser.setAccount(user.getAccount());
            ticketUser.setName(user.getName());
            //获取授权
            AuthorizePara authorizePara = new AuthorizePara();
            authorizePara.setUserSysNo(user.getSysno());
            authorizePara.setRoleStatus(1);
            authorizePara.setAuthorizeType(20);
            List<BsAuthorize> authorizes = authorizeService.getAuthorize(authorizePara);
            if(null!=authorizes && authorizes.size()>0){
                //获取功能权限
                List<Integer> authorizeSysNoList = new ArrayList<Integer>();
                for (BsAuthorize item:authorizes) {
                    authorizeSysNoList.add(item.getAuthorizesysno());
                }

                List<BsPermission> permissions =  permissionService.getListBySysNoList(authorizeSysNoList);
                if(null!=permissions && permissions.size()>0){
                    List<String> permissionsCode = new ArrayList<String>();
                    for (BsPermission permission:permissions) {
                        permissionsCode.add(permission.getCode());
                    }
                    ticketUser.setPermissionsCode(permissionsCode);
                }
            }
            ehcacheService.put("userAuth","ticket",JsonUtil.objToJson(ticketUser));
            CookieUtil.setCookie(response,"userSysNo",user.getSysno().toString(),24*60*60,null);
            CookieUtil.setCookie(response,"ticket", JsonUtil.objToJson(ticketUser),24*60*60,null);

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
     * @return
     */
    @RequestMapping("/timeout")
    public String timeout(){
        return "account/login";
    }
}
