package demo.service.interfaces.bs;

import com.github.pagehelper.Page;
import demo.model.JResult;
import demo.model.para.auth.RoleQueryPara;
import demo.model.para.bs.SaveRolePara;
import demo.model.table.bs.BsRole;
import demo.model.view.bs.RoleMultiVo;
import demo.model.view.bs.ZCheckTreeNodeVo;

import java.util.List;

/**
 * 角色业务接口
 *
 * @author 苟治国
 **/
public interface RoleService {

    /**
     * 获取角色
     * @param sysNo 系统编号
     */
    BsRole get(Integer sysNo);

    /**
     * 根据用户编号获取角色
     * @param userSysNo
     * @author 苟治国 创建
     */
    List<RoleMultiVo> getByUserSysNo(Integer userSysNo);

    /**
     * 获取角色菜单权限树
     * @param roleSysNo
     * @author 苟治国 创建
     */
    List<ZCheckTreeNodeVo> getRolePermissionByRoleSysNo(Integer roleSysNo);

    /**
     * 保存
     *
     * @param para
     * @author 苟治国 创建
     */
    JResult save(SaveRolePara para)  throws Exception;

    /**
     * 更新状态
     *
     * @param sysNo
     * @author 苟治国 创建
     */
    JResult updateStatus(Integer sysNo,Integer status);

    /**
     * 查询
     * @param
     * @return 列表
     * @author 苟治国 创建
     */
    Page<BsRole> getPager(RoleQueryPara para);

}
