package demo.auth;

/**
 * 权限码
 * @author 苟治国
 */
public enum AuthCode {

    NO("无权限","No"),
    ALL("所有权限","ALL"),
    //用户
    User0001("用户查看","User0001"),
    User0002("用户修改","User0002"),
    User0003("用户修改状态","User0003"),
    //功能权限
    Permission0001("功能权限查看","Permission0001"),
    Permission0002("功能权限修改","Permission0002"),
    Permission0003("功能权限状态","Permission0003"),
    Permission0004("功能权限删除","Permission0004"),
    //角色
    Role0001("角色查看","Role0001"),
    Role0002("角色修改","Role0002"),
    Role0003("角色修改状态","Role0003"),
    //菜单
    Menu0001("菜单查看","Menu0001"),
    Menu0002("菜单修改","Menu0002"),
    Menu0003("菜单状态","Menu0003"),
    Menu0004("菜单删除","Menu0004"),
    Menu0005("菜单权限删除","Menu0005");

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
