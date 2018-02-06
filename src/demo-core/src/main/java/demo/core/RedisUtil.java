package demo.core;

import com.alibaba.fastjson.JSON;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

/**
 *  redis工具类
 *  @author 苟治国
 */
public class RedisUtil {
    //Redis服务器IP
    private static String HOST = "127.0.0.1";
    //Redis的端口号
    private static int PORT = 6379;
    //Redis的超时
    private static int TIMEOUT =3000;
    //访问密码
    private static String PASSWORD = "";
    //创建连接池
    private static JedisPool jedisPool=null;
    //定义静态方法
    private static RedisUtil instance;

    /**
     * 定义私有构造方法、防止实例化
     */
    private RedisUtil(){
    }

    //定义静态方法、调用时再初始化类
    public static RedisUtil getInstance(){
        // 对象实例化时与否判断（不使用同步代码块，instance不等于null时，直接返回对象，提高运行效率）
        if (instance == null){
            synchronized (RedisUtil.class){
                //同步代码块（对象未初始化时，使用同步代码块，保证多线程访问时对象在第一次创建后，不再重复被创建）
                if (instance == null) {
                    instance = new RedisUtil();
                }
            }
        }
        return instance;
    }

    /**
     * 初始化Redis连接池
     */
    static {
        try {
            JedisPoolConfig config = new JedisPoolConfig();
            //控制一个pool最多有多少个状态为idle的jedis实例
            config.setMaxIdle(512);
            //最大能够保持空闲状态的对象数
            config.setMaxTotal(300);
            //在borrow一个jedis实例时，是否提前进行alidate操作；如果为true，则得到的jedis实例均是可用的；
            config.setTestOnBorrow(true);
            //在还会给pool时，是否提前进行validate操作
            config.setTestOnReturn(false);

            jedisPool = new JedisPool(config,HOST,PORT,TIMEOUT);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 获取Jedis实例
     * @return
     */
    public synchronized static Jedis getJedis(){
        try {
            if(jedisPool!=null){
                Jedis resource = jedisPool.getResource();
                return resource;
            }else{
                return null;
            }
        }catch (Exception ex){
            ex.printStackTrace();
            return null;
        }
    }

    /**
     * 释放jedis资源
     * @param jedis
     */
    public static void returnResource(final Jedis jedis){
        if(jedis!=null){
            jedisPool.returnResourceObject(jedis);
        }
    }

    /**
     * 设置
     */
    public void set(String key,Object object,int expire){
        Jedis jedis = null;
        try{
            jedis = jedisPool.getResource();
            if(null!=jedis){
                if(object instanceof String){
                    jedis.setex(key,expire,object.toString());
                }else{
                    jedis.setex(key,expire, JSON.toJSONString(object));
                }
            }
        }catch (Exception ex){
            jedis.close();
            ex.printStackTrace();
        }finally {
            returnResource(jedis);
        }
    }

    /**
     * 获取
     */
    public Object get(String key){
        Jedis jedis = null;
        try{
            jedis = jedisPool.getResource();
            if(null!=jedis){
                return jedis.get(key);
            }
        }catch (Exception ex){
            jedis.close();
            ex.printStackTrace();
        }finally {
            returnResource(jedis);
        }
        return null;
    }

    /**
     * 获取
     */
    public <T> T get(String key,Class<T> classs){
        Jedis jedis = null;
        try{
            jedis = jedisPool.getResource();
            if(null!=jedis){
                String values = jedis.get(key);
                if(null==values || values.trim().length()==0){
                    return null;
                }else{
                    return JSON.parseObject(jedis.get(key),classs);
                }
            }
        }catch (Exception ex){
            jedis.close();
            ex.printStackTrace();
        }finally {
            returnResource(jedis);
        }
        return null;
    }

    /**
     * 是否存在
     */
    public boolean exists(String key){
        Jedis jedis = null;
        try{
            jedis = jedisPool.getResource();
            if(null!=jedis){
                return jedis.exists(key);
            }
        }catch (Exception ex){
            //释放redis对象
            jedis.close();
            ex.printStackTrace();
        }finally {
            returnResource(jedis);
        }
        return false;
    }

    /**
     * 删除
     */
    public void delete(String key){
        Jedis jedis = null;
        try{
            jedis = jedisPool.getResource();
            if(null!=jedis){
                jedis.del(key);
            }
        }catch (Exception ex){
            //释放redis对象
            jedis.close();
            ex.printStackTrace();
        }finally {
            returnResource(jedis);
        }
    }
}
