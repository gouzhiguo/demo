package demo.model.view.bs;

/**
 * Checkbox Ztree
 *
 * @author 苟治国 创建
 */
public class ZCheckTreeNodeVo {
    /// <summary>
    /// 编号
    /// </summary>
    public String id;
    /// <summary>
    /// 父编号
    /// </summary>
    public String pId;
    /// <summary>
    /// 名称
    /// </summary>
    public String name;
    /// <summary>
    /// 是否选中
    /// </summary>
    public Boolean checked;
    /// <summary>
    /// 是否打开
    /// </summary>
    public Boolean open;
    /// <summary>
    /// 0 菜单 1 权限
    /// </summary>
    public Integer nodetype;
    /// <summary>
    /// 图标
    /// </summary>
    public String icon;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getpId() {
        return pId;
    }

    public void setpId(String pId) {
        this.pId = pId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getChecked() {
        return checked;
    }

    public void setChecked(Boolean checked) {
        this.checked = checked;
    }

    public Boolean getOpen() {
        return open;
    }

    public void setOpen(Boolean open) {
        this.open = open;
    }

    public Integer getNodetype() {
        return nodetype;
    }

    public void setNodetype(Integer nodetype) {
        this.nodetype = nodetype;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }
}
