package demo.dao.bs;

import com.github.pagehelper.Page;
import demo.model.para.bs.UpdatePassWordPara;
import demo.model.para.bs.UserQueryPara;
import demo.model.table.bs.BsUser;
import org.apache.ibatis.annotations.Param;

/**
 * 系统用户数据接口
 *
 * @author 苟治国
 **/
public interface UserMapper {
    /**
     * 获取用户
     * @param sysNo 系统编号
     */
    BsUser get(Integer sysNo);

    /**
     * 根据账号获取用户信息
     * @param account 系统编号
     */
    BsUser getByAccount(@Param("account") String account);

    /**
     * 更新密码
     * @param para 参数
     */
    int updatePassWord(UpdatePassWordPara para);

    /**
     * 更新状态
     *
     * @param sysNo
     * @param status
     * @author 苟治国 创建
     */
    Integer updateStatus(@Param("sysNo")Integer sysNo, @Param("status")Integer status);

    /**
     * 插入
     *
     * @param model
     * @author 苟治国 创建
     */
    int insert(BsUser model);

    /**
     * 更新
     *
     * @param model
     * @author 苟治国 创建
     */
    int update(BsUser model);

    /**
     * 查询
     * @param参数
     * @return 列表
     * @author 苟治国 创建
     */
    Page<BsUser> getPager(UserQueryPara para);
}
