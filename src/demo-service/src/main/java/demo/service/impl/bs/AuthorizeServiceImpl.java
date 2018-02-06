package demo.service.impl.bs;

import demo.dao.bs.AuthorizeMapper;
import demo.model.para.bs.AuthorizePara;
import demo.model.table.bs.BsAuthorize;
import demo.service.interfaces.bs.AuthorizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 权限功能业务接口实现
 *
 * @author 苟治国
 **/
@Service
public class AuthorizeServiceImpl implements AuthorizeService {

    @Autowired
    private AuthorizeMapper authorizeMapper;

    /**
     * 获取
     *
     * @param sysNo
     * @author 苟治国 创建
     */
    public BsAuthorize get(Integer sysNo){
        return authorizeMapper.get(sysNo);
    }

    /**
     * 根据用户编号获取功能权限列表
     * @param para 系统编号
     * @return 模型
     * @author 苟治国 创建
     */
    public List<BsAuthorize> getAuthorize(AuthorizePara para){
        return authorizeMapper.getAuthorize(para);
    }
}
