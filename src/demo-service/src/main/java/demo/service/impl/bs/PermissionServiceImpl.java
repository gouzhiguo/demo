package demo.service.impl.bs;

import com.github.pagehelper.Page;
import demo.dao.bs.PermissionMapper;
import demo.model.JResult;
import demo.model.para.auth.PermissionSavePara;
import demo.model.para.bs.PermissionQueryPara;
import demo.model.table.bs.BsPermission;
import demo.service.interfaces.bs.PermissionService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * 用户业务接口实现
 *
 * @author 苟治国
 **/
@Service
public class PermissionServiceImpl implements PermissionService {

    @Resource
    private PermissionMapper permissionMapper;

    /**
     * 获取
     * @param sysNo
     * @author 苟治国 创建
     */
    public BsPermission get(Integer sysNo){
        return permissionMapper.get(sysNo);
    }

    /**
     * 权限菜单编号获取菜单权限列表
     * @param menuSysNo
     * @return
     * @author 苟治国 创建
     */
    public List<BsPermission> getByMenuSysNo(Integer menuSysNo){

        List<BsPermission> permissionList = null;
        try {
            permissionList = permissionMapper.getByMenuSysNo(menuSysNo);
        }catch(Exception ex){
            ex.printStackTrace();
        }
        return permissionList;
    }


    /**
     * 验证用户是否存在
     * @param sysNo
     * @param name
     * @author 苟治国 创建
     */
    public JResult getByName(Integer sysNo,String name){
        JResult result = new JResult();
        result.setStatus(false);
        try {
            if(permissionMapper.getByName(sysNo,name)<=0){
                result.setStatus(true);
            }
        }catch (Exception ex){
            ex.printStackTrace();
            result.setMessage(ex.getMessage());
        }
        return result;
    }

    /**
     * 保存
     * @param para
     * @author 苟治国 创建
     */
    public JResult save(PermissionSavePara para){
        JResult result = new JResult();
        result.setStatus(false);

        BsPermission model = null;

        try {
            if(para.getSysno()==0){
                model = new BsPermission();
                model.setName(para.getName());
                model.setCode(para.getCode());
                model.setDescription(para.getDescription());
                model.setStatus(para.getStatus());
                if(permissionMapper.update(model)<=0){
                    throw new Exception("新增失败");
                }
                result.setStatus(true);
                result.setMessage("新增成功");
            }else{
                model = permissionMapper.get(para.getSysno());
                model.setName(para.getName());
                model.setCode(para.getCode());
                model.setDescription(para.getDescription());
                model.setStatus(para.getStatus());
                if(permissionMapper.update(model)<=0){
                    throw new Exception("修改失败");
                }
                result.setStatus(true);
                result.setMessage("修改成功");
            }
        }catch (Exception ex){
            result.setMessage(ex.getMessage());
            ex.printStackTrace();
        }
        return result;
    }

    /**
     * 更新状态
     * @param sysNo
     * @param status
     * @author 苟治国 创建
     */
    public JResult UpdateStatus(Integer sysNo,Integer status){
        JResult result = new JResult();
        result.setStatus(false);

        try {
            if(permissionMapper.updateStatus(sysNo,status)<=0){
                throw new Exception("更新状态失败");
            }
            result.setStatus(true);
            result.setMessage("更新状态成功");
        }catch (Exception ex){
            ex.printStackTrace();
            result.setMessage(ex.getMessage());
        }
        return result;
    }

    /**
     * 查询
     * @param para 参数
     * @return 列表
     * @auther 苟治国 创建
     */
    public Page<BsPermission> getPager(PermissionQueryPara para){
        return permissionMapper.getPager(para);
    }

    /**
     * 查询菜单功能权限分页数据
     * @param para 参数
     * @return 品牌列表
     * @author 苟治国
     */
    public Page<BsPermission> getPermissionPager(PermissionQueryPara para){
        return permissionMapper.getPermissionPager(para);
    }

    /**
     * 获取功能权限列表
     * @param list 参数
     * @return 品牌列表
     * @author 苟治国
     */
    public List<BsPermission> getListBySysNoList(List<Integer> list){
        return permissionMapper.getListBySysNoList(list);
    }
}
