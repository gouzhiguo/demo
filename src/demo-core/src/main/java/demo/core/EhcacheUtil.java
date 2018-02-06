package demo.core;

import org.springframework.cache.annotation.Cacheable;

/**
 * Ehcache
 * @author 苟治国
 */
public class EhcacheUtil {

    @Cacheable(value="auth", key="#key")
    public static String getStr(String key){
        System.out.println("调用了缓存的方法");

        Long timestamp = System.currentTimeMillis();
        return timestamp.toString();
    }
}
