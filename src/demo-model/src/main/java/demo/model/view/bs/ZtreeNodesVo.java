package demo.model.view.bs;

/**
 * ZTREE节点
 *
 * @author 苟治国 创建
 */
public class ZtreeNodesVo {

    //系统编号
    public Integer id;
    //名称
    private String name;
    //父节点
    private Integer pid;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }
}
