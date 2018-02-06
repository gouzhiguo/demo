package demo.model.view.bs;

import java.util.Date;

/**
 * 菜单权限视图
 *
 * @author 苟治国 创建
 */
public class MenuPermissionVo {

    private Integer sysno;

    private String name;

    private String code;

    private String description;

    private Integer status;

    private Integer createdby;

    private Date createddate;

    private Integer menuSysNo;

    public Integer getSysno() {
        return sysno;
    }

    public void setSysno(Integer sysno) {
        this.sysno = sysno;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getCreatedby() {
        return createdby;
    }

    public void setCreatedby(Integer createdby) {
        this.createdby = createdby;
    }

    public Date getCreateddate() {
        return createddate;
    }

    public void setCreateddate(Date createddate) {
        this.createddate = createddate;
    }

    public Integer getMenuSysNo() {
        return menuSysNo;
    }

    public void setMenuSysNo(Integer menuSysNo) {
        this.menuSysNo = menuSysNo;
    }
}
