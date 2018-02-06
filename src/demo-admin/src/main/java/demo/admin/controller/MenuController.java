package demo.admin.controller;

import com.github.pagehelper.Page;
import demo.model.JResult;
import demo.model.JResultT;
import demo.model.enums.IsNavEnum;
import demo.model.enums.StatusEnum;
import demo.model.para.auth.SaveMenuPara;
import demo.model.para.bs.PermissionQueryPara;
import demo.model.table.bs.BsPermission;
import demo.model.view.bs.MenuVo;
import demo.model.view.bs.ZtreeNodesVo;
import demo.service.interfaces.bs.MenuService;
import demo.service.interfaces.bs.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 菜单控制器
 * @author 苟治国
 */
@Controller
@RequestMapping("menu")
public class MenuController {
    /**
     * 菜单业务接口
     */
    @Autowired
    private MenuService menuService;
    @Autowired
    private PermissionService permissionService;

    /**
     * 菜单
     * @return
     * @author 苟治国 创建
     */
    @RequestMapping("index")
    public String index(Model model){
        model.addAttribute("statusEnum", StatusEnum.getStatusMap());
        model.addAttribute("isNavEnum", IsNavEnum.getStatusMap());
        return "menu/index";
    }

    /**
     * 获取菜单
     * @param sysNo
     * @return
     * @author 苟治国 创建
     */
    @RequestMapping(value = "getMenuBySysNo",method = {RequestMethod.POST})
    @ResponseBody
    public JResultT<MenuVo> getMenuBySysNo(@RequestParam(value = "sysNo") Integer sysNo){
        return menuService.getMenuBySysNo(sysNo);
    }

    /**
     * 根据父级编号获取菜单列表
     * @param parentSysNo
     * @author 苟治国 创建
     */
    @RequestMapping(value = "getMenuParentSysNo",method = {RequestMethod.POST})
    @ResponseBody
    public JResultT<List<ZtreeNodesVo>> getMenuParentSysNo(Integer parentSysNo){
        return menuService.getMenuParentSysNo(parentSysNo);
    }

    /**
     * 菜单列表
     * @return
     * @author 苟治国 创建
     */
    @RequestMapping(value = "getMenuList",method = {RequestMethod.POST})
    @ResponseBody
    public List<ZtreeNodesVo> getMenuList(){
        return menuService.getList(null);
    }

    /**
     *菜单权限
     * @param menuSysNo
     * @return
     * @author 苟治国 创建
     */
    @RequestMapping("permission")
    public String permission(@RequestParam("menuSysNo") Integer menuSysNo,Model model){

        model.addAttribute("menuSysNo",menuSysNo);
        return "menu/permission";
    }

    /**
     *菜单权限查询
     * @param para
     * @return
     * @author 苟治国 创建
     */
    @RequestMapping("permissionQuery")
    public String permissionQuery(PermissionQueryPara para, HttpServletRequest request, Model model){

        para.setPageIndex(Integer.parseInt(request.getParameter("pageIndex")));
        Page<BsPermission> pager = permissionService.getPermissionPager(para);

        model.addAttribute("statusEnum",StatusEnum.getStatusMap());
        model.addAttribute("list", pager.getResult());
        model.addAttribute("recordCount", pager.getTotal());
        return "menu/permissionQuery";
    }

    /**
     * 菜单 保存或更新
     *
     * @param para
     * @return
     * @author 苟治国 创建
     */
    @RequestMapping("saveMenu")
    public @ResponseBody JResult saveMenu(SaveMenuPara para){
        JResult result = new JResult();
        result.setStatus(false);
        try {
            result = menuService.save(para);
        }catch (Exception ex){
            result.setMessage(ex.getMessage());
        }
        return result;
    }

}
