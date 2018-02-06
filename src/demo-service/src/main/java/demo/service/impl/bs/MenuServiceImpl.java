package demo.service.impl.bs;

import demo.core.EasyMapperUtil;
import demo.dao.bs.MenuMapper;
import demo.dao.bs.MenuPermissionMapper;
import demo.dao.bs.PermissionMapper;
import demo.model.JResult;
import demo.model.JResultT;
import demo.model.para.auth.SaveMenuPara;
import demo.model.para.bs.MenuQueryPara;
import demo.model.table.bs.BsMenu;
import demo.model.table.bs.BsMenuPermission;
import demo.model.table.bs.BsPermission;
import demo.model.view.bs.MenuVo;
import demo.model.view.bs.PermissionVo;
import demo.model.view.bs.ZtreeNodesVo;
import demo.service.interfaces.bs.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * 菜单业务接口实现
 *
 * @author 苟治国
 **/
@Service
public class MenuServiceImpl implements MenuService {

    @Autowired
    private MenuMapper menuMapper;
    @Autowired
    private PermissionMapper permissionMapper;
    @Autowired
    private MenuPermissionMapper menuPermissionMapper;

    /**
     * 获取
     * @para sysNo
     * @author 苟治国 创建
     */
    public BsMenu get(Integer sysNo){
        return menuMapper.get(sysNo);
    }

    /**
     * 获取菜单
     * @param sysNo
     * @author 苟治国 创建
     */
    public JResultT<MenuVo> getMenuBySysNo(Integer sysNo){

        JResultT<MenuVo> resultT = new JResultT<MenuVo>();
        resultT.setStatus(false);
        try {
            BsMenu menu = menuMapper.get(sysNo);
            if(null!=menu){
                MenuVo menuVo = new MenuVo();
                menuVo.setSysno(menu.getSysno());
                menuVo.setName(menu.getName());
                menuVo.setParentsysno(menu.getParentsysno());
                menuVo.setIsnav(menu.getIsnav());
                menuVo.setUrl(menu.getUrl());
                menuVo.setDisplayorder(menu.getDisplayorder());
                menuVo.setDescription(menu.getDescription());
                menuVo.setStatus(menu.getStatus());
                //绑定权限
                List<BsPermission> list = permissionMapper.getByMenuSysNo(menu.getSysno());
                if(null!=list){
                    List<PermissionVo> permissionList = new ArrayList<PermissionVo>();
                    for (BsPermission item:list) {
                        PermissionVo permission = new PermissionVo();
                        permission.setSysno(item.getSysno());
                        permission.setName(item.getName());
                        permission.setCode(item.getCode());
                        permission.setDescription(item.getDescription());
                        permission.setStatus(item.getStatus());
                        permissionList.add(permission);
                    }
                    menuVo.setPermissionVoList(permissionList);
                }
                resultT.setData(menuVo);
            }
            resultT.setStatus(true);
        }catch (Exception ex){
            ex.printStackTrace();
            resultT.setMessage(ex.getMessage());
        }

        return resultT;
    }

    /**
     * 根据父级编号获取菜单列表
     * @param parentSysNo
     * @author 苟治国 创建
     */
    public JResultT<List<ZtreeNodesVo>> getMenuParentSysNo(Integer parentSysNo){

        JResultT<List<ZtreeNodesVo>> resultT = new JResultT<List<ZtreeNodesVo>>();
        resultT.setStatus(false);
        try {
            //获取全部菜单
            MenuQueryPara para = new MenuQueryPara();
            para.setParentsysno(parentSysNo);
            List<BsMenu> menuList = menuMapper.getList(para);
            //返回对象
            List<ZtreeNodesVo> ztreeNodesList = new ArrayList<ZtreeNodesVo>();
            if(null!=menuList){
                for (BsMenu item:menuList) {
                    ZtreeNodesVo ztreeNodes = new ZtreeNodesVo();
                    ztreeNodes.setId(item.getSysno());
                    ztreeNodes.setName(item.getName());
                    ztreeNodes.setPid(item.getParentsysno());
                    ztreeNodesList.add(ztreeNodes);
                }
                resultT.setData(ztreeNodesList);
            }
            resultT.setStatus(true);
        }catch (Exception ex){
            ex.printStackTrace();
            resultT.setMessage(ex.getMessage());
        }
        return resultT;
    }

    /**
     * 获取列表
     * @author 苟治国 创建
     */
    public List<ZtreeNodesVo> getList(MenuQueryPara para){
        //获取全部菜单
        List<BsMenu> menuList = menuMapper.getList(para);
        //返回对象
        List<ZtreeNodesVo> ztreeNodesList = new ArrayList<ZtreeNodesVo>();
        if(null!=menuList){
            for (BsMenu item:menuList) {
                ZtreeNodesVo ztreeNodes = new ZtreeNodesVo();
                ztreeNodes.setId(item.getSysno());
                ztreeNodes.setName(item.getName());
                ztreeNodes.setPid(item.getParentsysno());
                ztreeNodesList.add(ztreeNodes);
            }
        }
        return ztreeNodesList;
    }

    /**
     * 批量插入
     *
     * @param para
     * @author 苟治国 创建
     */
    public void insertByBatch(SaveMenuPara para) throws Exception{
        //菜单权限
        List<BsMenuPermission> menuPermissions = new ArrayList<BsMenuPermission>();
        if(null!=para.getPrivileges() && para.getPrivileges().size()>0){
            for (Integer item:para.getPrivileges()) {
                BsMenuPermission menuPermission = new BsMenuPermission();
                menuPermission.setPermissionsysno(item);
                menuPermission.setMenusysno(para.getSysno());
                menuPermissions.add(menuPermission);
            }
            if(null!=menuPermissions && menuPermissions.size()>0){
                Integer row = menuPermissionMapper.insertByBatch(menuPermissions);
                if(row<=0){
                    throw new  Exception("批量插入菜单权限失败");
                }
            }
        }
    }

    /**
     * 保存
     * @author 苟治国 创建
     */
    @Transactional(rollbackFor = Exception.class)
    public JResult save(SaveMenuPara para) throws Exception{
        JResult result = new JResult();
        result.setStatus(false);

        try {

            if(para.getSysno()!=null){
                //删除菜单权限
                menuPermissionMapper.deleteByMenuSysNo(para.getSysno());
                //批量插入菜单权限
                this.insertByBatch(para);

                BsMenu model = menuMapper.get(para.getSysno());
                model.setName(para.getName());
                model.setParentsysno(para.getParentsysno());
                model.setIsnav(para.getIsnav());
                model.setUrl(para.getUrl());
                model.setDescription(para.getDescription());
                model.setDisplayorder(para.getDisplayorder());
                if(menuMapper.update(model)<=0){
                    throw new Exception("更新菜单权限失败");
                }
                result.setStatus(true);
                result.setMessage("编辑菜单成功");
            }else{
                //批量插入菜单权限
                this.insertByBatch(para);

                BsMenu model = EasyMapperUtil.MapTo(para,BsMenu.class);
                if(menuMapper.insert(model)<=0){
                    throw new Exception("新增菜单权限失败");
                }

                result.setStatus(true);
                result.setMessage("新增菜单成功");
            }

        }catch (Exception ex){
            result.setMessage(ex.getMessage());
            ex.printStackTrace();
            throw  ex;
        }

        return result;
    }
}
