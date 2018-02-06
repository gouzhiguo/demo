package demo.model.para.bs;

import demo.model.PageCondition;

/**
 * Created by Administrator on 2017/12/19.
 */
public class MenuPermissionQueryPara extends PageCondition {
    /**
     * 状态：启用1，禁用0
     */
    private Integer status;

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
