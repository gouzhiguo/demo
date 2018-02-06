package demo.dao.crm;


import demo.model.table.crm.CrCustomer;

/**
 *
 */
public interface CustomerMapper {
    /**
     *
     * @param sysNo
     * @author 苟治国 创建
     */
    CrCustomer get(Integer sysNo);

    /**
     * 新增
     * @param model
     * @author 苟治国 创建
     */
    int insert(CrCustomer model);

    /**
     * 更新
     * @param model
     * @author 苟治国 创建
     */
    Integer update(CrCustomer model);
}