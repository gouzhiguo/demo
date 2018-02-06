package demo.model.output.bs.auth;

import java.util.List;

/// <summary>
/// 授权码
/// </summary>
public class PermissionCode {

    /// <summary>
    /// 权限代码
    /// </summary>
    private List<String> permissionsCode;

    public List<String> getPermissionsCode() {
        return permissionsCode;
    }

    public void setPermissionsCode(List<String> permissionsCode) {
        this.permissionsCode = permissionsCode;
    }

}
