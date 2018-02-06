package demo.service.interfaces.bs;

import com.github.pagehelper.Page;
import demo.model.JResult;
import demo.model.para.auth.PermissionSavePara;
import demo.model.para.bs.PermissionQueryPara;
import demo.model.table.bs.BsPermission;

import java.util.List;

/**
 * 用户业务接口
 *
 * @author 苟治国
 **/
public interface PermissionService {
    /**
     * 获取
     * @param sysNo
     * @author 苟治国 创建
     */
    BsPermission get(Integer sysNo);

    /**
     * 权限菜单编号获取菜单权限列表
     * @param menuSysNo
     * @return
     * @author 苟治国 创建
     */
    List<BsPermission> getByMenuSysNo(Integer menuSysNo);

    /**
     * 验证用户是否存在
     * @param sysNo
     * @param name
     * @author 苟治国 创建
     */
    JResult getByName(Integer sysNo, String name);

    /**
     * 更新状态
     * @param sysNo
     * @param status
     * @author 苟治国 创建
     */
    JResult UpdateStatus(Integer sysNo, Integer status);

    /**
     * 保存
     * @param para
     * @author 苟治国 创建
     */
    JResult save(PermissionSavePara para);

    /**
     * 查询
     * @param para 参数
     * @return 列表
     * @auther 苟治国 创建
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
