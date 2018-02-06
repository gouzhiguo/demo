/**
 * 用户单元测试
 */

import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/** 注入相关的配置文件：可以写入多个配置文件 **/
@RunWith(SpringJUnit4ClassRunner.class)
public class EhcacheTest {
    @Test
    public void testEhcache() {
        // Creating a CacheManager based on a specified configuration file.
        CacheManager manager = CacheManager.newInstance("ehcache.xml");
        // obtains a Cache called sampleCache1, which has been preconfigured in the configuration file
        Cache cache = manager.getCache("userAuth");
        // puts an element into a cache
        Element element = new Element("key1", "哈哈");
        cache.put(element);
        //The following gets a NonSerializable value from an element with a key of key1.
        Object value = element.getObjectValue();
        System.out.println(value.toString());
        manager.shutdown();
    }
}
