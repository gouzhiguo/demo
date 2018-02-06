package demo.core;

import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.PropertiesConfiguration;

import java.util.HashMap;
import java.util.Map;

/**
 * 读取配置文件类
 * 根据配置文件名和属性key返回属性内容，configUtil.get(configFile, property);
 * configUtil.get("/common/velocity.properties", "input.encoding");
 * @author 苟治国
 */
public class ConfigUtil {

    private static ConfigUtil config = new ConfigUtil();

    private static Map<String, Object> configMap = new HashMap<String, Object>();

    private ConfigUtil() {}

    /**
     * 获取内容
     * @param configFile
     * @param property
     * @return
     * @author 苟治国
     */
    public static String get(String configFile, String property) {

        if(!configMap.containsKey(configFile)) {
            config.getProperties(configFile);
        }
        PropertiesConfiguration config = (PropertiesConfiguration) configMap.get(configFile);
        String value = config.getString(property);
        return value;
    }

    /**
     * 载入配置文件，初始化后加入map
     * @param configFile
     * @author 苟治国
     */
    public static void getProperties(String configFile)
    {
        try {
            PropertiesConfiguration config = new PropertiesConfiguration(configFile);
            configMap.put(configFile, config);
        } catch (ConfigurationException e) {
            e.printStackTrace();
        }
    }
}
