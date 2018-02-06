package demo.service.interfaces.bs;

import demo.model.para.bs.AuthorizePara;
import demo.model.table.bs.BsAuthorize;

import java.util.List;

/**
 * 授权哦业务接口
 *
 * @author 苟治国
 **/
public interface AuthorizeService {

    /**
     * 获取
     *
     * @param sysNo
     * @author 苟治国 创建
     */
    BsAuthorize get(Integer sysNo);

    /**
     * 根据用户编号获取功能权限列表
     * @param para 系统编号
     * @return 模型
     * @author 苟治国 创建
     */
    List<BsAuthorize> getAuthorize(AuthorizePara para);
}
