package demo.model.para.auth;

import demo.model.PageCondition;

/**
 * 权查询参数
 * @author  苟治国
 */
public class RoleQueryPara extends PageCondition {
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
