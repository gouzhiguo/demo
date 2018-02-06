package demo.service.interfaces.core;
import java.util.List;

/**
 * 缓存业务接口
 *
 * @author 苟治国
 **/
public interface EhcacheService {
    Object get(String cacheName,String key);
    /**
     * 获取缓存
     * @param cacheName
     * @param key
     * @param value
     * @return
     */
    Object get(String cacheName, String key,String value);

    /**
     * 是否存在
     * @param cacheName
     * @param key
     * @return
     */
    boolean exist(String cacheName, String key);

    void put(String cacheName,String key,String value);
    /**
     * 获取用户票据
     * @return
     */
    List<String> getTicketUser();
}
