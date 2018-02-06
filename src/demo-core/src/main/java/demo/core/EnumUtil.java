package demo.core;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Created by Administrator on 2017/12/22.
 */
public class EnumUtil {
    /**
     * 通过枚举值获得枚举名称
     * @param ref
     * @param value
     * @param <T>
     * @return
     */
    public static <T extends Enum<T>> String getText(Class<T> ref ,Integer value){
        Map<String ,Integer> map=getMap(ref);
        for (Map.Entry<String, Integer> entry: map.entrySet()) {
            if(entry.getValue()==value)
                return entry.getKey();
        }
        return "";
    }

    /**
     * 通过枚举类型获取枚举名称值Map
     * @param ref
     * @param <T>
     * @return
     */
    public static <T extends Enum<T>> Map<String, Integer> getMap(Class<T> ref){
        Map<String, Integer> map = new LinkedHashMap<String, Integer>() ;
        if(ref.isEnum()){
            T[] ts = ref.getEnumConstants() ;
            for(T t : ts){
                map.put(t.name() , t.ordinal() ) ;
            }
        }
        return map ;
    }
}
