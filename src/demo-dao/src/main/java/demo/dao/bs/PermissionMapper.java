package demo.dao.bs;

import com.github.pagehelper.Page;
import demo.model.para.bs.PermissionQueryPara;
import demo.model.table.bs.BsPermission;
import demo.model.view.bs.MenuPermissionVo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 权限数据接口
 *
 * @author 苟治国
 **/
public interface PermissionMapper {

    /**
     *
     * @param sysNo
     * @author 苟治国 创建
     */
    BsPermission get(Integer sysNo);

    /**
     * 获取菜单权限列表
     *
     * @param menuSysNo
     * @author 苟治国 创建
     */
    List<MenuPermissionVo> getRolePermissionByRoleSysNo(@Param("menuSysNo") Integer menuSysNo);

    /**
     * 权限菜单编号获取菜单权限列表
     * @param menuSysNo
     * @return
     * @author 苟治国 创建
     */
    List<BsPermission> getByMenuSysNo(@Param("menuSysNo") Integer menuSysNo);

    /**
     * 验证用户是否存在
     * @param sysNo
     * @param name
     * @author 苟治国 创建
     */
    Integer getByName(@Param("sysNo") Integer sysNo, @Param("name") String name);

    /**
     * 新增
     * @param model
     * @author 苟治国 创建
     */
    int insert(BsPermission model);

    /**
     * 更新
     * @param model
     * @author 苟治国 创建
     */
    Integer update(BsPermission model);

    /**
     * 更新状态
     * @param sysNo
     * @param status
     * @author 苟治国 创建
     */
    Integer updateStatus(@Param("sysNo") Integer sysNo, @Param("status") Integer status);

    /**
     * 查询
     * @param para 参数
     * @return 品牌列表
     * 2017-1-19 苟治国 创建
     */
    Page<BsPermission> getPager(PermissionQueryPara para);

    /**
     * 查询菜单功能权限分页数据
     * @param para 参数
     * @return 品牌列表
     * @author 苟治国
     */
    Page<BsPermission> getPermissionPager(PermissionQueryPara para);

    /**
     * 获取功能权限列表
     * @param list 参数
     * @return 品牌列表
     * @author 苟治国
     */
    List<BsPermission> getListBySysNoList(List<Integer> list);
}