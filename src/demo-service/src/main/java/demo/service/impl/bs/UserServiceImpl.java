package demo.service.impl.bs;

import com.github.pagehelper.Page;
import demo.core.EasyMapperUtil;
import demo.dao.bs.UserMapper;
import demo.dao.bs.UserRoleMapper;
import demo.model.JResult;
import demo.model.para.bs.SaveUserPara;
import demo.model.para.bs.UpdatePassWordPara;
import demo.model.para.bs.UserQueryPara;
import demo.model.table.bs.BsUser;
import demo.model.table.bs.BsUserRole;
import demo.service.interfaces.bs.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * 用户业务接口实现
 *
 * @author 苟治国
 **/
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private UserRoleMapper userRoleMapper;

    /**
     * 获取用户(https://www.cnblogs.com/coprince/p/5984816.html)
     * @param sysNo 系统编号
     */
    public BsUser get(Integer sysNo){
        return userMapper.get(sysNo);
    }

    @Cacheable(value="auth", key="#key")
    public String getStr(String key){
        System.out.println("调用了缓存的方法");

        Long timestamp = System.currentTimeMillis();
        return timestamp.toString();
    }

    //@CacheEvict(value="myCache", key="'get'+#userNo")
    //System.out.println("移除缓存中此用户号[" + userNo + "]对应的用户名[" + usersData.get(userNo) + "]的缓存");

    //@CacheEvict(value="myCache", allEntries=true)
    //allEntries为true表示清除value中的全部缓存,默认为false
    /**
     * 根据账号获取用户信息
     * @param account 系统编号
     */
    public BsUser getByAccount(String account){
        return userMapper.getByAccount(account);
    }

    /**
     * 更新密码(事务Demo)
     * @param para 参数
     * @return JResult
     */
    @Transactional(rollbackFor = Exception.class)
    public JResult updatePassWord(UpdatePassWordPara para) throws Exception{

        JResult result = new JResult();
        result.setStatus(false);
        try{
            Integer row = userMapper.updatePassWord(para);
            if(row<=0) {
                result.setStatus(true);
                result.setMessage("更新密码成功！");
            }else{
                throw new Exception("更新密码失败");
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
            if(userMapper.updateStatus(sysNo,status)<=0){
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
     * 保存、修改
     *
     * @param para
     * @author 苟治国 创建
     */
    @Transactional(rollbackFor = Exception.class)
    public JResult saveUser(SaveUserPara para) throws Exception{
        JResult result = new JResult();
        result.setStatus(false);

        try
        {
            if(para.getSysno()!=null){
                //根据用户编号删除关联表信息
                userRoleMapper.deleteByUserSysNo(para.getSysno());
                //批量插入
                List<BsUserRole> userRoleList = new ArrayList<BsUserRole>();
                for (Integer roleSysNo:para.getRoleIds()) {
                    BsUserRole userRole = new BsUserRole();
                    userRole.setUsersysno(para.getSysno());
                    userRole.setRolesysno(roleSysNo);
                    userRoleList.add(userRole);
                }
                if(null!=userRoleList && userRoleList.size()>0){
                    userRoleMapper.insertByBatch(userRoleList);
                }
                BsUser user = EasyMapperUtil.MapTo(para,BsUser.class);
                if(userMapper.update(user)<=0){
                    throw new Exception("编辑用户失败");
                }

                result.setStatus(true);
                result.setMessage("编辑用户成功");
            }
            else{
                //批量插入
                List<BsUserRole> userRoleList = new ArrayList<BsUserRole>();
                for (Integer roleSysNo:para.getRoleIds()) {
                    BsUserRole userRole = new BsUserRole();
                    userRole.setUsersysno(para.getSysno());
                    userRole.setRolesysno(roleSysNo);
                    userRoleList.add(userRole);
                }
                if(null!=userRoleList && userRoleList.size()>0){
                    userRoleMapper.insertByBatch(userRoleList);
                }
                BsUser user = EasyMapperUtil.MapTo(para,BsUser.class);
                if(userMapper.insert(user)<=0){
                    throw new Exception("编辑用户失败");
                }

                result.setStatus(true);
                result.setMessage("编辑用户成功");
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }

        return result;
    }

    /**
     * 查询
     * @param参数
     * @return 列表
     * @author 苟治国 创建
     */
    public Page<BsUser> getPager(UserQueryPara para){
        return userMapper.getPager(para);
    }
}
