package demo.service.interfaces.core;

import demo.model.output.bs.auth.TicketUser;

/**
 * 缓存业务接口
 *
 * @author 苟治国
 **/
public interface EhcacheService {
    Object get(String cacheName,String key);
    void put(String cacheName,String key,String value);
    /**
     * 获取用户票据
     * @return
     */
    TicketUser getTicketUser();
}
