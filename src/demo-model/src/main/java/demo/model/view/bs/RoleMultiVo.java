package demo.model.view.bs;

/**
 * Created by Administrator on 2018/1/2.
 */
public class RoleMultiVo {

    //系统编号
    private Integer sysno;
    //名称
    private String name;
    //选中
    private boolean checked;

    public Integer getSysno() {
        return sysno;
    }

    public void setSysno(Integer sysno) {
        this.sysno = sysno;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }
}
