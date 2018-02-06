package demo.admin.controller;

import com.github.pagehelper.Page;
import demo.model.JResult;
import demo.model.enums.StatusEnum;
import demo.model.para.auth.PermissionSavePara;
import demo.model.para.bs.PermissionQueryPara;
import demo.model.table.bs.BsPermission;
import demo.service.interfaces.bs.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * 权限控制器
 * @author 苟治国
 */
@Controller
@RequestMapping("permission")
public class PermissionController {
    /**
     * 用户业务接口
     */
    @Autowired
    private PermissionService permissionService;

    /**
     * 权限代码
     * @return
     * @author 苟治国 创建
     */
    @RequestMapping("index")
    public String index(Model model){
        model.addAttribute("statusEnum", StatusEnum.getStatusMap());
        return "permission/index";
    }

    /**
     * 权限查询
     * @param para
     * @return view
     * @author 苟治国 创建
     */
    @RequestMapping("indexQuery")
    public String indexQuery(PermissionQueryPara para, HttpServletRequest request, Model model){

        para.setPageIndex(Integer.parseInt(request.getParameter("pageIndex")));
        Page<BsPermission> pager =permissionService.getPager(para);

        model.addAttribute("statusEnum",StatusEnum.getStatusMap());
        model.addAttribute("list", pager.getResult());
        model.addAttribute("recordCount", pager.getTotal());

        return "permission/indexQuery";
    }

    /**
     * 修改
     * @param sysNo
     * @return view
     * @author 苟治国 创建
     */
    @RequestMapping("permissionEdit")
    public String permissionEdit(Integer sysNo,Model model){

        BsPermission permission = null;

        if(null==sysNo){
            permission = new BsPermission();
        }else{
            permission = permissionService.get(sysNo);
        }
        model.addAttribute("statusEnum",StatusEnum.getStatusMap());
        model.addAttribute("model",permission);
        return "permission/permissionEdit";
    }

    /**
     * 保存
     * @param para
     * @return JResult
     * @author 苟治国 创建
     */
    @RequestMapping(value = "permissionEdit",method = {RequestMethod.POST})
    @ResponseBody
    public JResult permissionEdit(PermissionSavePara para){
        return permissionService.save(para);
    }

    /**
     * 更新状态
     * @param sysNo
     * @param status
     * @return JResult
     * @author 苟治国 创建
     */
    @RequestMapping(value = "updatePermissionStatus",method = {RequestMethod.GET})
    @ResponseBody
    public JResult updatePermissionStatus(@RequestParam(value = "sysNo") Integer sysNo, @RequestParam("status") Integer status){
        return permissionService.UpdateStatus(sysNo,status);
    }
}
