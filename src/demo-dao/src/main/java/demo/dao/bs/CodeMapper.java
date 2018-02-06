package demo.dao.bs;

import demo.model.table.bs.BsCode;

/**
 * 码表数据接口
 *
 * @author 苟治国
 **/
public interface CodeMapper {
    /**
     *
     * @param sysNo
     * @author 苟治国 创建
     */
    BsCode get(Integer sysNo);

    /**
     * 新增
     * @param model
     * @author 苟治国 创建
     */
    int insert(BsCode model);

    /**
     * 更新
     * @param model
     * @author 苟治国 创建
     */
    Integer update(BsCode model);
}