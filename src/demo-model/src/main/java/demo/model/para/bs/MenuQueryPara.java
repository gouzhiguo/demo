package demo.model.para.bs;

import demo.model.PageCondition;

public class MenuQueryPara  extends PageCondition {
    /**
     * 状态：启用1，禁用0
     */
    private Integer status;
    /**
     * 父级编号
     */
    private Integer parentsysno;

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getParentsysno() {
        return parentsysno;
    }

    public void setParentsysno(Integer parentsysno) {
        this.parentsysno = parentsysno;
    }
}
