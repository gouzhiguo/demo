package demo.model.enums;

import java.util.HashMap;
import java.util.Map;

/**
 * 资源类型 菜单（10） 权限（20）
 *
 * @author 苟治国
 */
public enum AuthorizeTypeEnum {

    MENU(10, "菜单"), AUTH(20, "权限");

    private AuthorizeTypeEnum(int status, String description) {
        this.status = status;
        this.description = description;
    }

    /** 状态值 */
    private int status;

    /** 状态描述 */
    private String description;

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * 根据状态值获取枚举值
     *
     * @param status
     * @return
     */
    public static AuthorizeTypeEnum getStatus(int status) {
        for (AuthorizeTypeEnum e : AuthorizeTypeEnum.values()) {
            if (e.getStatus() == status) {
                return e;
            }
        }
        return null;
    }

    /**
     * 返回key value集合
     *
     * @return
     */
    public static Map<Integer, String> getStatusMap() {
        Map<Integer, String> rs = new HashMap<Integer, String>();
        for (AuthorizeTypeEnum o : AuthorizeTypeEnum.values()) {
            rs.put(o.getStatus(), o.getDescription());
        }
        return rs;
    }

    /**`
     * 返回参数名 key集合
     *
     * @return
     */
    public static Map<String, Integer> getTypeMap() {
        Map<String, Integer> rs = new HashMap<String, Integer>();
        for (AuthorizeTypeEnum o : AuthorizeTypeEnum.values()) {
            if (o.getStatus() > -1)
                rs.put(o.toString(), o.getStatus());
        }
        return rs;
    }
}
