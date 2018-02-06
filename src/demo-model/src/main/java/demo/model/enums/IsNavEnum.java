package demo.model.enums;

import java.util.HashMap;
import java.util.Map;

/**
 * 枚举
 *
 * @author 苟治国
 */
public enum  IsNavEnum {

    DISPLAY(1, "显示"), NODISPLAY(0, "不显示");

    private IsNavEnum(int status, String description) {
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
    public static StatusEnum getStatus(int status) {
        for (StatusEnum e : StatusEnum.values()) {
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
        for (StatusEnum o : StatusEnum.values()) {
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
        for (StatusEnum o : StatusEnum.values()) {
            if (o.getStatus() > -1)
                rs.put(o.toString(), o.getStatus());
        }
        return rs;
    }
}
