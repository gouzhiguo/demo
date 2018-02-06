/**
 * 用户单元测试
 */

import demo.model.JResult;
import demo.model.table.bs.BsRole;
import demo.service.interfaces.bs.RoleService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/** 注入相关的配置文件：可以写入多个配置文件 **/
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:applicationContext.xml"})
public class RoleTest {
    /**
     * 用户业务接口
     */
    @Autowired
    private RoleService roleService;

    @Test
    public void getUser() throws Exception{
        BsRole user = roleService.get(1);

        Integer ss= 0;
    }

    @Test
    public void updateUser() throws Exception{
        JResult result = roleService.updateStatus(1,0);

        Integer ss= 0;
    }
}
