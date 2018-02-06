package demo.service.interfaces.bs;

import com.github.pagehelper.Page;
import demo.model.JResult;
import demo.model.output.bs.auth.PermissionCode;
import demo.model.para.bs.SaveUserPara;
import demo.model.para.bs.UpdatePassWordPara;
import demo.model.para.bs.UserQueryPara;
import demo.model.table.bs.BsUser;

import java.util.List;

/**
 * 用户业务接口
 *
 * @author 苟治国
 **/
public interface UserService {

    /**
     * 获取用户
     *
     * @param sysNo 系统编号
     */
    BsUser get(Integer sysNo);

    /**
     * 用户登录
     * @param account
     * @param password
     * @throws Exception
     * @author 苟治国
     */
    BsUser login(String account,String password) throws Exception;

    /**
     * 获取用户权限
     * @param userSysNo
     * @throws Exception
     * @author 苟治国
     */
    List<String> getPermissionCode(Integer userSysNo);

    String getStr(String key);

    /**
     * 根据账号获取用户信息
     * @param account 系统编号
     * @author 苟治国
     */
    BsUser getByAccount(String account);

    /**
     * 更新密码
     * @param para 参数
     * @return
     */
    JResult updatePassWord(UpdatePassWordPara para) throws Exception;

    /**
     * 更新状态
     *
     * @param sysNo
     * @author 苟治国 创建
     */
    JResult updateStatus(Integer sysNo, Integer status);

    /**
     * 保存、修改
     *
     * @param para
     * @author 苟治国 创建
     */
    JResult saveUser(SaveUserPara para) throws Exception;

    /**
     * 查询
     * @param参数
     * @return 列表
     * @author 苟治国 创建
     */
    Page<BsUser> getPager(UserQueryPara para);
}
