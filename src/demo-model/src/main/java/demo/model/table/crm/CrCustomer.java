package demo.model.table.crm;

import java.util.Date;

/**
 * 会员
 * @author 苟治国
 **/
public class CrCustomer {

    private Integer sysno;

    private String account;

    private String password;

    private String safepassword;

    private String email;

    private Integer emailstatus;

    private String realname;

    private Date birthday;

    private String headimgurl;

    private String phonenumber;

    private String registerip;

    private Date registerdate;

    private String lastloginip;

    private Date lastlogindate;

    private Integer logincount;

    private Integer status;

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

    public String getSafepassword() {
        return safepassword;
    }

    public void setSafepassword(String safepassword) {
        this.safepassword = safepassword;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getEmailstatus() {
        return emailstatus;
    }

    public void setEmailstatus(Integer emailstatus) {
        this.emailstatus = emailstatus;
    }

    public String getRealname() {
        return realname;
    }

    public void setRealname(String realname) {
        this.realname = realname;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getHeadimgurl() {
        return headimgurl;
    }

    public void setHeadimgurl(String headimgurl) {
        this.headimgurl = headimgurl;
    }

    public String getPhonenumber() {
        return phonenumber;
    }

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }

    public String getRegisterip() {
        return registerip;
    }

    public void setRegisterip(String registerip) {
        this.registerip = registerip;
    }

    public Date getRegisterdate() {
        return registerdate;
    }

    public void setRegisterdate(Date registerdate) {
        this.registerdate = registerdate;
    }

    public String getLastloginip() {
        return lastloginip;
    }

    public void setLastloginip(String lastloginip) {
        this.lastloginip = lastloginip;
    }

    public Date getLastlogindate() {
        return lastlogindate;
    }

    public void setLastlogindate(Date lastlogindate) {
        this.lastlogindate = lastlogindate;
    }

    public Integer getLogincount() {
        return logincount;
    }

    public void setLogincount(Integer logincount) {
        this.logincount = logincount;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getCreateddate() {
        return createddate;
    }

    public void setCreateddate(Date createddate) {
        this.createddate = createddate;
    }
}