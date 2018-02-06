package demo.admin.controller;

import com.github.pagehelper.Page;
import demo.auth.AuthCode;
import demo.auth.CheckAuth;
import demo.model.JResult;
import demo.model.enums.StatusEnum;
import demo.model.para.bs.SaveUserPara;
import demo.model.para.bs.UserQueryPara;
import demo.model.table.bs.BsUser;
import demo.service.interfaces.bs.RoleService;
import demo.service.interfaces.bs.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * 用户控制器
 * @author 苟治国
 */
@Controller
@RequestMapping("user")
public class UserController {

    /**
     * 用户
     */
    @Autowired
    private UserService userService;
    /**
     * 角色
     */
    @Autowired
    private RoleService roleService;

    /**
     * 用户
     * @return 视图
     * @author 苟治国 创建
     */
    @RequestMapping("index")
    @CheckAuth(authCode= {AuthCode.User0001,AuthCode.User0002})
    public String index(Model model){
        model.addAttribute("statusEnum", StatusEnum.getStatusMap());
        return "user/index";
    }

    /**
     * 用户查询
     * @return 视图
     * @author 苟治国 创建
     */
    @RequestMapping("indexQuery")
    @CheckAuth(authCode= {AuthCode.User0001,AuthCode.User0002})
    public String indexQuery(UserQueryPara para, HttpServletRequest request, Model model){

        para.setPageIndex(Integer.parseInt(request.getParameter("pageIndex")));
        Page<BsUser> pager =userService.getPager(para);

        model.addAttribute("statusEnum",StatusEnum.getStatusMap());
        model.addAttribute("list", pager.getResult());
        model.addAttribute("recordCount", pager.getTotal());
        return "user/indexQuery";
    }

    /**
     * 修改
     * @param sysNo
     * @return 视图
     * @author 苟治国 创建
     */
    @RequestMapping("userEdit")
    @CheckAuth(authCode= {AuthCode.User0002})
    public String userEdit(Integer sysNo,Model model){
        BsUser user = null;

        Integer userSysNo = 0;

        if(null==sysNo){
            user = new BsUser();
        }else{
            user = userService.get(sysNo);
            if(user!=null){
                userSysNo = user.getSysno();
            }
        }
        model.addAttribute("statusEnum",StatusEnum.getStatusMap());
        model.addAttribute("roles",roleService.getByUserSysNo(userSysNo));
        model.addAttribute("model",user);
        return "user/userEdit";
    }

    /**
     * 更新状态
     * @param para
     * @return JResult
     * @author 苟治国 创建
     */
    @RequestMapping(value = "saveUser",method = {RequestMethod.POST})
    @ResponseBody
    @CheckAuth(authCode= {AuthCode.User0002})
    public JResult saveUser(SaveUserPara para) throws Exception{
        return userService.saveUser(para);
    }

    /**
     * 更新状态
     * @param sysNo
     * @param status
     * @return JResult
     * @author 苟治国 创建
     */
    @RequestMapping(value = "updateRoleStatus",method = {RequestMethod.GET})
    @ResponseBody
    @CheckAuth(authCode= {AuthCode.User0003})
    public JResult updateRoleStatus(@RequestParam(value = "sysNo") Integer sysNo, @RequestParam("status") Integer status){
        return userService.updateStatus(sysNo,status);
    }
}
