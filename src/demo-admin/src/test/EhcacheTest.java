/**
 * 用户单元测试
 */

import demo.service.interfaces.bs.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/** 注入相关的配置文件：可以写入多个配置文件 **/
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:dispatcherServlet-servlet.xml"})
public class EhcacheTest {
}
