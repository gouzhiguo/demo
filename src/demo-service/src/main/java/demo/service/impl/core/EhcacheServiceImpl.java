package demo.service.impl.core;

import demo.core.JsonUtil;
import demo.model.output.bs.auth.TicketUser;
import demo.service.interfaces.core.EhcacheService;
import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 缓存业务接口实现
 *
 * @author 苟治国
 **/
@Service
public class EhcacheServiceImpl implements EhcacheService {

    @Autowired
    private CacheManager cacheManager;

    /**
     * 获取缓存
     * @param cacheName
     * @param key
     * @return
     */
    public Object get(String cacheName, String key)
    {
        Cache cache = cacheManager.getCache(cacheName);
        Element element = cache.get(key);
        return element == null ? null : element.getObjectValue();
    }

    /**
     * 获取缓存
     * @param cacheName
     * @param key
     * @param value
     * @return
     */
    public Object get(String cacheName, String key,String value)
    {
        Cache cache = cacheManager.getCache(cacheName);
        Element element = cache.get(key);
        if(element==null){
            //写入缓存
            cache.put(new Element(key,value));

            return value;
        }else{
            return element.getObjectValue();
        }
    }

    /**
     * 是否存在
     * @param cacheName
     * @param key
     * @return
     */
    public boolean exist(String cacheName, String key){
        Cache cache = cacheManager.getCache(cacheName);
        Element element = cache.get(key);
        return element == null ? true : false;
    }

    /**
     * 添加缓存
     * @param cacheName
     * @param key
     * @param value
     */
    public void put(String cacheName, String key, String value){
        try {
            Cache cache = cacheManager.getCache(cacheName);
            cache.put(new Element(key,value));
        }catch (Exception ex){
            ex.printStackTrace();
        }
    }

    /**
     * 获取缓存对象
     * @param cacheName
     * @return
     */
    public Cache get(String cacheName){
        return cacheManager.getCache(cacheName);
    }

    /**
     * 移除缓存
     * @param cacheName
     * @param key
     */
    public void remove(String cacheName, String key) {
        Cache cache = cacheManager.getCache(cacheName);
        cache.remove(key);
    }

    /**
     * 获取用户票据
     * @return
     */
    public List<String> getTicketUser(){

        List<String> ticket = null;

        try {
            Object object = this.get("userAuth","ticket");
            if(object!=null){
                ticket = JsonUtil.jsonToListObj(object.toString(),String.class);
            }
        }catch (Exception ex){
            ex.printStackTrace();
        }

        return ticket;
    }
}
