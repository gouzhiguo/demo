package demo.service.impl.bs;

import com.github.pagehelper.Page;
import demo.core.JsonUtil;
import demo.dao.bs.*;
import demo.model.JResult;
import demo.model.enums.AuthorizeTypeEnum;
import demo.model.para.auth.RoleQueryPara;
import demo.model.para.bs.AuthorizePara;
import demo.model.para.bs.SaveRolePara;
import demo.model.table.bs.BsAuthorize;
import demo.model.table.bs.BsMenu;
import demo.model.table.bs.BsRole;
import demo.model.table.bs.BsUserRole;
import demo.model.view.bs.MenuPermissionVo;
import demo.model.view.bs.RoleMultiVo;
import demo.model.view.bs.ZCheckTreeNodeVo;
import demo.service.interfaces.bs.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 角色业务接口实现
 *
 * @author 苟治国
 **/
@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private MenuMapper menuMapper;
    @Autowired
    private RoleMapper roleMapper;
    @Autowired
    private UserRoleMapper userRoleMapper;
    @Autowired
    private PermissionMapper permissionMapper;
    @Autowired
    private AuthorizeMapper authorizeMapper;
    @Autowired
    private MenuPermissionMapper menuPermissionMapper;
    /**
     * 获取角色
     * @param sysNo 系统编号
     */
    public BsRole get(Integer sysNo){
        return roleMapper.get(sysNo);
    }

    /**
     * 根据用户编号获取角色
     * @param userSysNo
     * @author 苟治国 创建
     */
    public List<RoleMultiVo> getByUserSysNo(Integer userSysNo){

        //获取所有角色
        List<BsRole> list = roleMapper.getList();
        //获取已选择角色
        List<BsUserRole> selectedList=null;
        if(null!=userSysNo){
            selectedList = userRoleMapper.getByUserSysNo(userSysNo);
        }

        List<RoleMultiVo> roleMultiVos = new ArrayList<RoleMultiVo>();
        for (BsRole item:list) {
            boolean echecked = roleMultiSelected(selectedList,userSysNo,item.getSysno());

            RoleMultiVo vo = new RoleMultiVo();
            vo.setSysno(item.getSysno());
            vo.setName(item.getName());
            vo.setChecked(echecked);
            roleMultiVos.add(vo);
        }

        return roleMultiVos;
    }

    /**
     * 角色是否选中
     * @param selectedList
     * @param usersysno
     * @param rolesysNo
     * @author 苟治国 创建
     */
    private boolean roleMultiSelected(List<BsUserRole> selectedList, Integer usersysno,int rolesysNo){
        if(selectedList!=null){
            for (BsUserRole item:selectedList) {
                if(item.getRolesysno().equals(rolesysNo) && item.getUsersysno().equals(usersysno)){
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 菜单、权限是否选中
     * @param authorizes
     * @param authorizeType
     * @param menuSysNo
     * @author 苟治国 创建
     */
    private JResult menuPermissionSelected(List<BsAuthorize> authorizes,int authorizeType,int menuSysNo){

        JResult result = new JResult();
        result.setStatus(false);

        for (BsAuthorize item:authorizes) {
            if(item.getAuthorizetype().equals(authorizeType) && item.getAuthorizesysno().equals(menuSysNo))            {
                result.setStatus(true);
            }
        }
        return result;
    }

    /**
     * 获取角色菜单权限树
     * @param roleSysNo
     * @author 苟治国 创建
     */
    public List<ZCheckTreeNodeVo> getRolePermissionByRoleSysNo(Integer roleSysNo){

        //菜单列表
        List<BsMenu> menuList= menuMapper.getList(null);
        //菜单权限列表
        //List<MenuPermissionVo> menuPermissionVos =  menuPermissionMapper.getMenuPermissionList();
        //获取已选择菜单权限列表
        List<BsAuthorize> authorizes = authorizeMapper.getAuthorizeRoleSysNo(roleSysNo);

        List<ZCheckTreeNodeVo> zCheckTreeNodeVoList = new ArrayList<ZCheckTreeNodeVo>();

        for (BsMenu item:menuList) {

            ZCheckTreeNodeVo zCheckTreeNodeVo = new ZCheckTreeNodeVo();
            zCheckTreeNodeVo.setId(String.format("m_%s",item.getSysno()));
            zCheckTreeNodeVo.setpId(String.format("m_%s",item.getParentsysno()));
            zCheckTreeNodeVo.setName(item.getName());
            zCheckTreeNodeVo.setNodetype(AuthorizeTypeEnum.MENU.getStatus());
            zCheckTreeNodeVo.checked = menuPermissionSelected(authorizes,AuthorizeTypeEnum.MENU.getStatus(),item.getSysno()).getStatus();
            zCheckTreeNodeVoList.add(zCheckTreeNodeVo);
            //菜单权限
            List<MenuPermissionVo> menuPermissionVoList = permissionMapper.getRolePermissionByRoleSysNo(item.getSysno());
            if(null!=menuPermissionVoList && menuPermissionVoList.size()>0){
                for (MenuPermissionVo p:menuPermissionVoList) {
                    ZCheckTreeNodeVo childzCheckTreeNodeVo = new ZCheckTreeNodeVo();
                    childzCheckTreeNodeVo.setId(String.format("p_%s",p.getSysno()));
                    childzCheckTreeNodeVo.setpId(String.format("m_%s",item.getSysno()));
                    childzCheckTreeNodeVo.setName(p.getName());
                    childzCheckTreeNodeVo.setNodetype(AuthorizeTypeEnum.AUTH.getStatus());
                    childzCheckTreeNodeVo.checked = menuPermissionSelected(authorizes,AuthorizeTypeEnum.AUTH.getStatus(),p.getSysno()).getStatus();
                    zCheckTreeNodeVoList.add(childzCheckTreeNodeVo);
                }
            }
        }
        return zCheckTreeNodeVoList;
    }

    /**
     * 批量插入
     *
     * @param para
     * @author 苟治国 创建
     */
    private void insertByBatch(SaveRolePara para) throws Exception{

        if(para.getAuthorize()!=null && para.getAuthorize()!=""){
            List<AuthorizePara> authorizeParas = JsonUtil.jsonToListObj(para.getAuthorize(),AuthorizePara.class);
            if(null!=authorizeParas && authorizeParas.size()>0){
                List<BsAuthorize> authorizes = new ArrayList<BsAuthorize>();
                for (AuthorizePara item:authorizeParas) {
                    BsAuthorize authorize = new BsAuthorize();
                    authorize.setRolesysno(item.getRoleSysNo());
                    authorize.setAuthorizesysno(item.getAuthorizeSysNo());
                    authorize.setAuthorizetype(item.getAuthorizeType());
                    authorizes.add(authorize);
                }
                if(authorizes.size()>0){
                    Integer row = authorizeMapper.insertByBatch(authorizes);
                    if(row<=0){
                        throw new  Exception("批量插入角色权限失败");
                    }
                }
            }
        }
    }

    /**
     * 保存
     *
     * @param para
     * @author 苟治国 创建
     */
    public JResult save(SaveRolePara para)  throws Exception
    {
        JResult result = new JResult();
        result.setStatus(false);

        try {
            if(para.getSysno()!=null){
                //删除角色授权信息
                authorizeMapper.deleteByRoleSysNo(para.getSysno());
                //批量插入授权信息
                this.insertByBatch(para);

                BsRole role = roleMapper.get(para.getSysno());
                if(null==role){
                    result.setMessage("角色对象不存在");
                    return result;
                }

                role.setName(para.getName());
                role.setDescription(para.getDescription());
                role.setStatus(para.getStatus());

                if(roleMapper.update(role)<=0){
                    throw new Exception("编辑角色权限失败");
                }

                result.setStatus(true);
            }else{
                //批量插入授权信息
                this.insertByBatch(para);

                BsRole role = new BsRole();
                role.setName(para.getName());
                role.setDescription(para.getDescription());
                role.setStatus(para.getStatus());
                role.setCreatedby(0);
                role.setCreateddate(new Date());

                if(roleMapper.insert(role)<=0){
                    throw new Exception("新增角色权限失败");
                }

                result.setStatus(true);
            }
        }catch (Exception ex){
            ex.printStackTrace();
            throw ex;
        }
        return result;
    }

    /**
     * 更新状态
     *
     * @param sysNo
     * @author 苟治国 创建
     */
    public JResult updateStatus(Integer sysNo, Integer status){

        JResult result = new JResult();
        result.setStatus(false);

        try {
            if(roleMapper.updateStatus(sysNo,status)<=0){
                throw new Exception("更新状态失败");
            }
            result.setStatus(true);
        }catch (Exception ex){
            result.setMessage(ex.getMessage());
            ex.printStackTrace();
        }

        return result;
    }

    /**
     * 查询
     * @para para
     * @return 列表
     * @author 苟治国 创建
     */
    public Page<BsRole> getPager(RoleQueryPara para){
        Page<BsRole>  rolePage = null;
        try {
            rolePage = roleMapper.getPager(para);
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return rolePage;
    }
}
