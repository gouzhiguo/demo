package demo.admin.controller;

import com.github.pagehelper.Page;
import demo.model.JResult;
import demo.model.enums.StatusEnum;
import demo.model.para.auth.RoleQueryPara;
import demo.model.para.bs.AuthorizePara;
import demo.model.para.bs.SaveRolePara;
import demo.model.table.bs.BsRole;
import demo.service.interfaces.bs.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 *
 * @author 苟治国
 */
@Controller
@RequestMapping("role")
public class RoleController {
    /**
     * 角色业务接口
     */
    @Autowired
    private RoleService roleService;

    /**
     * 角色
     * @return
     * @author 苟治国 创建
     */
    @RequestMapping("index")
    public String index(Model model){
        model.addAttribute("statusEnum", StatusEnum.getStatusMap());
        return "role/role";
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
    public JResult updateRoleStatus(@RequestParam(value = "sysNo") Integer sysNo, @RequestParam("status") Integer status){
        return roleService.updateStatus(sysNo,status);
    }

    /**
     * 查询
     * @return
     * @author 苟治国 创建
     */
    @RequestMapping("indexQuery")
    public String indexQuery(RoleQueryPara para, HttpServletRequest request, Model model){

        para.setPageIndex(Integer.parseInt(request.getParameter("pageIndex")));
        Page<BsRole> pager = roleService.getPager(para);

        model.addAttribute("statusEnum",StatusEnum.getStatusMap());
        model.addAttribute("list", pager.getResult());
        model.addAttribute("recordCount", pager.getTotal());
        return "role/roleQuery";
    }

    /**
     * 修改
     * @param sysNo
     * @return view
     * @author 苟治国 创建
     */
    @RequestMapping("roleEdit")
    public String roleEdit(Integer sysNo,Model model){

        BsRole role = null;

        if(null==sysNo){
            role = new BsRole();
        }else{
            role = roleService.get(sysNo);
        }
        model.addAttribute("statusEnum",StatusEnum.getStatusMap());
        model.addAttribute("model",role);
        return "role/roleEdit";
    }

    /**
     * 保存
     * @param role SaveRolePara
     * @return JResult @RequestBody AuthorizePara[] authorize
     * @author 苟治国 创建
     */
    @RequestMapping(value = "roleSave",method = {RequestMethod.POST})
    @ResponseBody
    public JResult roleSave(SaveRolePara para)
    {
        JResult result = new JResult();
        result.setStatus(false);

        try {
            result = roleService.save(para);
        }catch (Exception ex){
            result.setMessage(ex.getMessage());
        }
        return result;
    }
}
