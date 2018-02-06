package demo.dao.bs;

import demo.model.table.bs.BsMenuPermission;
import demo.model.view.bs.MenuPermissionVo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 菜单权限数据接口
 *
 * @author 苟治国
 **/
public interface MenuPermissionMapper {

    /**
     *
     * @param sysNo
     * @author 苟治国 创建
     */
    BsMenuPermission get(Integer sysNo);

    /**
     * 根据菜单编号删除菜单权限
     * @param menuSysNo
     * @author 苟治国 创建
     */
    Integer deleteByMenuSysNo(@Param("menuSysNo") Integer menuSysNo);

    /**
     * 批量插入
     * @param list
     * @return 模型
     * @author 苟治国 创建
     */
    int insertByBatch(List<BsMenuPermission> list);

    /**
     * 新增
     * @param model
     * @author 苟治国 创建
     */
    Integer insert(BsMenuPermission model);

    /**
     * 更新
     * @param model
     * @author 苟治国 创建
     */
    Integer update(BsMenuPermission model);

    /**
     * 菜单权限列表
     * @author 苟治国 创建
     */
    List<MenuPermissionVo> getMenuPermissionList();
}
