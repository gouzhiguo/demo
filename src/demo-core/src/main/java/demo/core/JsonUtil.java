package demo.core;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;

import java.util.List;

/**
 * Json工具类
 * @author 苟治国
 */
public class JsonUtil {
    /**
     * json字符串转对象
     * @param jsonStr json字符串
     * @param clazz 对象类型
     * @param <T>
     * @return 实体类
     */
    public static  <T> T jsonToObj(String jsonStr, Class<T> clazz) {
        return JSON.parseObject(jsonStr, clazz);
    }


    /**
     * 对象转json字符串
     * @param obj 对象实体
     * @return 字符串
     */
    public static String objToJson(Object obj){
        String jsonStr = "";
        jsonStr =  JSON.toJSONString(obj,SerializerFeature.WriteDateUseDateFormat);
        return jsonStr;
    }


    /**
     * Json字符串转List对象
     * @param jsonString 列表Json字符串
     * @param clazz 对象类型
     * @param <T>
     * @return 对象列表
     */
    public static <T> List<T> jsonToListObj(String jsonString, Class<T> clazz) {
        return JSON.parseArray(jsonString, clazz);
    }


    /**
     * Json字符串转Json对象
     * @param jsonStr json字符串
     * @return json对象
     */
    public static JSONObject toJsonObject(String jsonStr){
        return JSON.parseObject(jsonStr);
    }
}
