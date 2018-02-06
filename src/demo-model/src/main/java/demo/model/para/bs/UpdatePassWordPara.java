package demo.model.para.bs;

/**
 * 更新密码
 */
public class UpdatePassWordPara {

    /// <summary>
    /// 系统编号
    /// </summary>
    private Integer sysNo;
    /// <summary>
    /// 密码
    /// </summary>
    private String passWord;

    public Integer getSysNo() {
        return sysNo;
    }

    public void setSysNo(Integer sysNo) {
        this.sysNo = sysNo;
    }

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }
}
