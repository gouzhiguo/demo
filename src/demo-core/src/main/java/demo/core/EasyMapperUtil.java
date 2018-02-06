package demo.core;

import com.baidu.unbiz.easymapper.MapperFactory;

import java.util.ArrayList;

/**
 * 对象映射类
 * @author 苟治国
 */
public class EasyMapperUtil {
    /**
     *转换对象为指定类型
     * @param source 源对象
     * @param clazz 目标类型
     * @return
     */
    public static <TDestination> TDestination MapTo(Object source,Class<TDestination> clazz)
    {
        if (source != null)
        {
            TDestination dto = MapperFactory.getCopyByRefMapper() .mapClass(source.getClass(), clazz).registerAndMap(source, clazz);
            return dto;
        }
        return null;
    }

    /**
     * 转换对象为指定对象
     * @param source 源对象
     * @param destination 目标对象
     * @param <TSource>
     * @param <TDestination>
     * @return
     */
    public static <TSource, TDestination> TDestination MapTo(TSource source, TDestination destination)
    {
        if (source != null)
        {
            TDestination dto = MapperFactory.getCopyByRefMapper().mapClass(source.getClass(), destination.getClass()).registerAndMap(source, destination);
            return dto;
        }
        return null;
    }

    /**
     * 转换对象为指定对象类型列表
     * @param source 源对象列表
     * @param <TSource>
     * @param <TDestination>
     * @return
     */
    public static <TSource, TDestination> java.util.List<TDestination> MapToList(java.util.List<TSource> source,Class<TDestination> clazz)
    {
        java.util.List<TDestination> res=new ArrayList<TDestination>();
        for (TSource tSource : source) {
            res.add(MapTo(tSource,clazz));
        }
        return res;
    }
}
