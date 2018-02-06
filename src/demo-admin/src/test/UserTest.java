import demo.model.table.bs.BsUser;
import demo.service.interfaces.bs.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;


/**
 * 用户单元测试
 */
/** 注入相关的配置文件：可以写入多个配置文件 **/
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:applicationContext.xml"})
public class UserTest {
    /**
     * 用户业务接口
     */
    @Autowired
    private UserService userService;

    @Test
    public void getUser() throws Exception{

        BsUser user = userService.get(1);

        Integer ss= 0;
    }

    @Test
    public void getStr() throws Exception{

        String str = userService.getStr("abc");

        Integer ss= 0;
    }
}
