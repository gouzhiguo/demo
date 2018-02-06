package demo.model.para.bs;

/**
 * 登录参数
 */
public class LoginPara {

    //账号
    private String account;
    //密码
    private String password;
    //验证码
    private String code;

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

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
