package demo.model.table.bs;

/**
 * 授权表
 * @author 苟治国
 **/
public class BsAuthorize {

    private Integer sysno;

    private Integer rolesysno;

    private Integer authorizesysno;

    private Integer authorizetype;

    public Integer getSysno() {
        return sysno;
    }

    public void setSysno(Integer sysno) {
        this.sysno = sysno;
    }

    public Integer getRolesysno() {
        return rolesysno;
    }

    public void setRolesysno(Integer rolesysno) {
        this.rolesysno = rolesysno;
    }

    public Integer getAuthorizesysno() {
        return authorizesysno;
    }

    public void setAuthorizesysno(Integer authorizesysno) {
        this.authorizesysno = authorizesysno;
    }

    public Integer getAuthorizetype() {
        return authorizetype;
    }

    public void setAuthorizetype(Integer authorizetype) {
        this.authorizetype = authorizetype;
    }
}