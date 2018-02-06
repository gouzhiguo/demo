package demo.model.table.bs;

import java.util.Date;

/**
 * 菜单
 * @author 苟治国
 **/
public class BsMenu {

    private Integer sysno;

    private String name;

    private Integer parentsysno;

    private Integer isnav;

    private String url;

    private Integer displayorder;

    private String description;

    private Integer status;

    private Integer createdby;

    private Date createddate;

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
        this.name = name == null ? null : name.trim();
    }

    public Integer getParentsysno() {
        return parentsysno;
    }

    public void setParentsysno(Integer parentsysno) {
        this.parentsysno = parentsysno;
    }

    public Integer getIsnav() {
        return isnav;
    }

    public void setIsnav(Integer isnav) {
        this.isnav = isnav;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url == null ? null : url.trim();
    }

    public Integer getDisplayorder() {
        return displayorder;
    }

    public void setDisplayorder(Integer displayorder) {
        this.displayorder = displayorder;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
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
}
