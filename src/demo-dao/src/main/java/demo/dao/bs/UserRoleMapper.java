package demo.dao.bs;

import demo.model.table.bs.BsUserRole;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 用户角色数据接口
 *
 * @author 苟治国
 **/
public interface UserRoleMapper {

    /**
     *
     * @param sysNo
     * @author 苟治国 创建
     */
    BsUserRole get(Integer sysNo);

    /**
     * 新增
     * @param model
     * @author 苟治国 创建
     */
    int insert(BsUserRole model);

    /**
     * 更新
     * @param model
     * @author 苟治国 创建
     */
    Integer update(BsUserRole model);

    /**
     * 获取用户角色
     * @param userSysNo
     * @author 苟治国 创建
     */
    List<BsUserRole> getByUserSysNo(@Param("userSysNo") Integer userSysNo);

    /**
     * 根据用户编号删除关联表信息
     * @param userSysNo
     * @return 模型
     * @author 苟治国 创建
     */
    int deleteByUserSysNo(@Param("userSysNo") Integer userSysNo);

    /**
     * 批量插入
     * @param list
     * @return 模型
     * @author 苟治国 创建
     */
    int insertByBatch(List<BsUserRole> list);
}
