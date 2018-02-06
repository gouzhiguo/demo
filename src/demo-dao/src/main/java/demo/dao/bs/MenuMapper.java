package demo.dao.bs;

import demo.model.para.bs.MenuQueryPara;
import demo.model.table.bs.BsMenu;

import java.util.List;

public interface MenuMapper {

    /**
    * 获取
     * @param sysNo
     * @author 苟治国 创建
     */
    BsMenu get(Integer sysNo);

    /**
     * 获取列表
     * @author 苟治国 创建
     */
    List<BsMenu> getList(MenuQueryPara para);

    /**
     * 插入
     * @param model
     * @author 苟治国 创建
     */
    int insert(BsMenu model);

    /**
     * 更新
     * @param model
     * @author 苟治国 创建
     */
    Integer update(BsMenu model);
}
