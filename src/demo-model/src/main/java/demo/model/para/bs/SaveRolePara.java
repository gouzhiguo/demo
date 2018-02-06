package demo.model.para.bs;

/**
 * 权限保存参数
 */
public class SaveRolePara {

    private Integer sysno;

    private String name;

    private String description;

    private Integer status;

    private String authorize;

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

    public String getAuthorize() {
        return authorize;
    }

    public void setAuthorize(String authorize) {
        this.authorize = authorize;
    }
}
