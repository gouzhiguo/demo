package demo.model.table.bs;

/**
 * 菜单权限关联表
 * @author 苟治国
 **/
public class BsMenuPermission {

    private Integer sysno;

    private Integer permissionsysno;

    private Integer menusysno;

    public Integer getSysno() {
        return sysno;
    }

    public void setSysno(Integer sysno) {
        this.sysno = sysno;
    }

    public Integer getPermissionsysno() {
        return permissionsysno;
    }

    public void setPermissionsysno(Integer permissionsysno) {
        this.permissionsysno = permissionsysno;
    }

    public Integer getMenusysno() {
        return menusysno;
    }

    public void setMenusysno(Integer menusysno) {
        this.menusysno = menusysno;
    }

}