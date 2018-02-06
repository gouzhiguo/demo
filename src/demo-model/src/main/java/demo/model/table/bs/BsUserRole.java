package demo.model.table.bs;

import java.util.Date;

/**
 * 用户角色关联表
 * @author 苟治国
 **/
public class BsUserRole {
    private Integer sysno;

    private Integer usersysno;

    private Integer rolesysno;

    private Integer createdby;

    private Date createddate;

    public Integer getSysno() {
        return sysno;
    }

    public void setSysno(Integer sysno) {
        this.sysno = sysno;
    }

    public Integer getUsersysno() {
        return usersysno;
    }

    public void setUsersysno(Integer usersysno) {
        this.usersysno = usersysno;
    }

    public Integer getRolesysno() {
        return rolesysno;
    }

    public void setRolesysno(Integer rolesysno) {
        this.rolesysno = rolesysno;
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