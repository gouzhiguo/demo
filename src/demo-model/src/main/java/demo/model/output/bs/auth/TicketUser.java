package demo.model.output.bs.auth;

import java.util.List;

/// <summary>
/// 用户对象
/// </summary>
public class TicketUser {

    /// <summary>
    /// 系统编号
    /// </summary>
    private Integer SysNo;

    /// <summary>
    /// 用户账号
    /// </summary>
    private String Account;

    /// <summary>
    /// 昵称
    /// </summary>
    private String Name;

    /// <summary>
    /// 真实名称
    /// </summary>
    private String FullName;

    /// <summary>
    /// 角色编号
    /// </summary>
    private int RoleSysNo;

    /// <summary>
    /// 权限代码
    /// </summary>
    private List<String> permissionsCode;

    public Integer getSysNo() {
        return SysNo;
    }

    public void setSysNo(Integer sysNo) {
        SysNo = sysNo;
    }

    public String getAccount() {
        return Account;
    }

    public void setAccount(String account) {
        Account = account;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getFullName() {
        return FullName;
    }

    public void setFullName(String fullName) {
        FullName = fullName;
    }

    public int getRoleSysNo() {
        return RoleSysNo;
    }

    public void setRoleSysNo(int roleSysNo) {
        RoleSysNo = roleSysNo;
    }

    public List<String> getPermissionsCode() {
        return permissionsCode;
    }

    public void setPermissionsCode(List<String> permissionsCode) {
        this.permissionsCode = permissionsCode;
    }
}
