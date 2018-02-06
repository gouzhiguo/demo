package demo.model;

/**
 * 执行结果
 */
public class JResult {
    /**
     * 是否成功
     */
    private Boolean status;
    /**
     * 消息
     */
    private String message;
    /**
     * 结果代码
     */
    private String code;

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
