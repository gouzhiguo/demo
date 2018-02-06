package demo.model;

/**
 * 执行结果
 */
public class JResultT<T> extends JResult {

    /**
     * 返回对象
     */
    private T data;

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
