package demo.dao.bs;

import demo.model.para.bs.AuthorizePara;
import demo.model.table.bs.BsAuthorize;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 授权数据接口
 *
 * @author 苟治国
 **/
public interface AuthorizeMapper {

    /**
     *
     * @param sysNo
     * @author 苟治国 创建
     */
    BsAuthorize get(Integer sysNo);

    /**
     *获取功能权限列表
     * @param roleSysNo
     * @author 苟治国 创建
     */
    List<BsAuthorize> getAuthorizeRoleSysNo(@Param("roleSysNo") Integer roleSysNo);

    /**
     * 新增
     * @param model
     * @author 苟治国 创建
     */
    Integer insert(BsAuthorize model);

    /**
     * 更新
     * @param model
     * @author 苟治国 创建
     */
    Integer update(BsAuthorize model);

    /**
     * 删除角色所有数据
     * @param roleSysNo
     * @author 苟治国 创建
     */
    Integer deleteByRoleSysNo(@Param("roleSysNo") Integer roleSysNo);

    /**
     * 批量插入
     * @param list 系统编号
     * @return 模型
     * @author 苟治国 创建
     */
    int insertByBatch(List<BsAuthorize> list);

    /**
     * 根据用户编号获取功能权限列表
     * @param para 系统编号
     * @return 模型
     * @author 苟治国 创建
     */
    List<BsAuthorize> getAuthorize(AuthorizePara para);
}
