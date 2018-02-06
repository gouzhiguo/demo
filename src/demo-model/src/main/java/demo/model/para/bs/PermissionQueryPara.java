package demo.model.para.bs;

import demo.model.PageCondition;

/**
 * 权查询参数
 * @author 苟治国
 */
public class PermissionQueryPara  extends PageCondition {
    /**
     * 状态：启用1，禁用0
     */
    private Integer status;

    /**
     * 菜单编号
     */
    private Integer menuSysNo;

    /**
     * 权限功能名称
     */
    private String name;

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getMenuSysNo() {
        return menuSysNo;
    }

    public void setMenuSysNo(Integer menuSysNo) {
        this.menuSysNo = menuSysNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
