package demo.model.output.bs.auth;

/// <summary>
/// 用户对象
/// </summary>
public class Ticket {

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
}
