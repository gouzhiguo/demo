package demo.auth;

/**
 * 权限码
 * @author 苟治国 2017/6/30
 */
public enum AuthCode {

    NO("无权限","No"),
    ALL("所有权限","ALL"),

    //用户权限
    User0001("用户查看","User0001"),
    User0002("用户修改","User0002"),
    User0003("用户修改状态","User0003");


    private AuthCode(String name, String index) {
        this.name = name;
        this.index = index;
    }

    private String name;
    private String index;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIndex() {
        return index;
    }

    public void setIndex(String index) {
        this.index = index;
    }
}
