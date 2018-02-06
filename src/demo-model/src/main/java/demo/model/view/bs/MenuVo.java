package demo.model.view.bs;

import java.util.Date;
import java.util.List;

/**
 * ZTREE节点
 *
 * @author 苟治国 创建
 */
public class MenuVo {

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

    private List<PermissionVo> permissionVoList;

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
        this.url = url;
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

    public List<PermissionVo> getPermissionVoList() {
        return permissionVoList;
    }

    public void setPermissionVoList(List<PermissionVo> permissionVoList) {
        this.permissionVoList = permissionVoList;
    }
}
