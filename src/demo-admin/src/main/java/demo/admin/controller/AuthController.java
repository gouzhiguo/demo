package demo.admin.controller;

import demo.model.view.bs.ZCheckTreeNodeVo;
import demo.service.interfaces.bs.MenuService;
import demo.service.interfaces.bs.PermissionService;
import demo.service.interfaces.bs.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 权限控制器
 * @author 苟治国
 */
@Controller
@RequestMapping("auth")
public class AuthController {

    /**
     * 用户业务接口
     */
    @Autowired
    private PermissionService permissionService;
    /**
     * 菜单业务接口
     */
    @Autowired
    private MenuService menuService;
    /**
     * 角色业务接口
     */
    @Autowired
    private RoleService roleService;

    /**
     * 获取角色菜单权限树
     * @param roleSysNo
     * @return view
     * @author 苟治国 创建
     */
    @RequestMapping("getMenuPermissionTree")
    @ResponseBody
    public List<ZCheckTreeNodeVo> getMenuPermissionTree(@RequestParam("roleSysNo") Integer roleSysNo){
        return roleService.getRolePermissionByRoleSysNo(roleSysNo);
    }
}
