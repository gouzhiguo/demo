package demo.dao.bs;

import com.github.pagehelper.Page;
import demo.model.para.auth.RoleQueryPara;
import demo.model.table.bs.BsRole;
import demo.model.table.bs.BsUserRole;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 角色数据接口
 *
 * @author 苟治国
 **/
public interface RoleMapper {

    /**
     *
     * @param sysNo
     * @author 苟治国 创建
     */
    BsRole get(Integer sysNo);

    /**
     * 根据用户编号获取角色
     * @param userSysNo 用户编号
     * @author 苟治国 创建
     */
    List<BsUserRole> getByUserSysNo(@Param("userSysNo")Integer userSysNo);

    /**
     * 获取所有角色
     * @author 苟治国 创建
     */
    List<BsRole> getList();

    /**
     * 更新状态
     *
     * @param sysNo
     * @param status
     * @author 苟治国 创建
     */
    Integer updateStatus(@Param("sysNo")Integer sysNo, @Param("status")Integer status);

    /**
     * 新增
     * @param model
     * @author 苟治国 创建
     */
    int insert(BsRole model);

    /**
     * 更新
     * @param model
     * @author 苟治国 创建
     */
    Integer update(BsRole model);

    /**
     * 查询
     * @param参数
     * @return 列表
     * @author 苟治国 创建
     */
    Page<BsRole> getPager(RoleQueryPara para);
}
