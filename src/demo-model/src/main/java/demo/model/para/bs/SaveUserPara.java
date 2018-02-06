package demo.model.para.bs;

import java.util.List;

/**
 * 保存角色
 */
public class SaveUserPara {
    /// <summary>
    /// 系统编号
    /// </summary>
    private Integer sysno;
    /// <summary>
    /// 账号
    /// </summary>
    private String account;
    /// <summary>
    /// 姓名
    /// </summary>
    private String name;
    /// <summary>
    /// 手机号码
    /// </summary>
    private String mobile;
    /// <summary>
    /// 电子邮箱
    /// </summary>
    private String email;
    /// <summary>
    /// 状态 启用（1）禁用（0）
    /// </summary>
    private Integer status;
    /// <summary>
    /// 角色编号
    /// </summary>
    private List<Integer> roleIds;

    public Integer getSysno() {
        return sysno;
    }

    public void setSysno(Integer sysno) {
        this.sysno = sysno;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public List<Integer> getRoleIds() {
        return roleIds;
    }

    public void setRoleIds(List<Integer> roleIds) {
        this.roleIds = roleIds;
    }
}
