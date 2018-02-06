package demo.service.interfaces.bs;

import demo.model.JResult;
import demo.model.JResultT;
import demo.model.para.auth.SaveMenuPara;
import demo.model.para.bs.MenuQueryPara;
import demo.model.table.bs.BsMenu;
import demo.model.view.bs.MenuVo;
import demo.model.view.bs.ZtreeNodesVo;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 菜单业务接口
 *
 * @author 苟治国
 **/
public interface MenuService {

    /**
     * 获取
     * @param sysNo
     * @author 苟治国 创建
     */
    BsMenu get(Integer sysNo);

    /**
     * 获取菜单
     * @param sysNo
     * @author 苟治国 创建
     */
    JResultT<MenuVo> getMenuBySysNo(Integer sysNo);

    /**
     * 根据父级编号获取菜单列表
     * @param parentSysNo
     * @author 苟治国 创建
     */
    JResultT<List<ZtreeNodesVo>> getMenuParentSysNo(Integer parentSysNo);

    /**
     * 获取列表
     * @author 苟治国 创建
     */
    List<ZtreeNodesVo> getList(MenuQueryPara para);

    /**
     * 保存
     * @author 苟治国 创建
     */
    @Transactional(rollbackFor = Exception.class)
    JResult save(SaveMenuPara para) throws Exception;
}
