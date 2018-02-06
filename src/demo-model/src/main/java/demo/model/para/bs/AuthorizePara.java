package demo.model.para.bs;

/**
 * 授权
 */
public class AuthorizePara {
    //用户编号
    private int userSysNo;
    //角色编号
    private int roleSysNo;
    //资源编号
    public int authorizeSysNo;
    //角色状态
    public int roleStatus;
    //资源类型 菜单（10） 权限（20）
    public int authorizeType;

    public int getUserSysNo() {
        return userSysNo;
    }

    public void setUserSysNo(int userSysNo) {
        this.userSysNo = userSysNo;
    }

    public int getRoleSysNo() {
        return roleSysNo;
    }

    public void setRoleSysNo(int roleSysNo) {
        this.roleSysNo = roleSysNo;
    }

    public int getAuthorizeSysNo() {
        return authorizeSysNo;
    }

    public void setAuthorizeSysNo(int authorizeSysNo) {
        this.authorizeSysNo = authorizeSysNo;
    }

    public int getRoleStatus() {
        return roleStatus;
    }

    public void setRoleStatus(int roleStatus) {
        this.roleStatus = roleStatus;
    }

    public int getAuthorizeType() {
        return authorizeType;
    }

    public void setAuthorizeType(int authorizeType) {
        this.authorizeType = authorizeType;
    }
}
