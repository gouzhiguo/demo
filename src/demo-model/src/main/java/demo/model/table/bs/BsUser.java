package demo.model.table.bs;

import java.util.Date;

/**
 * 系统用户
 * @author 苟治国
 **/
public class BsUser {

    /// <summary>
    /// 系统编号
    /// </summary>
    private Integer sysno;
    /// <summary>
    /// 账号
    /// </summary>
    private String account;
    /// <summary>
    /// 密码
    /// </summary>
    private String password;
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
    /// 创建人
    /// </summary>
    private Integer createdby;
    /// <summary>
    /// 创建时间
    /// </summary>
    private Date createddate;

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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
