package demo.core;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * Cookie
 * @author 苟治国
 */
public class CookieUtil {

    /**
     * 添加cookie
     * @param response
     * @param key
     * @param value
     * @param maxAge
     * @param domain
     * @author 苟治国
     */
    public static void setCookie(HttpServletResponse response, String key, String value, Integer maxAge,String domain){
        Cookie cookie = new Cookie(key, value);
        cookie.setPath("/");
        cookie.setMaxAge(maxAge);
        if(null!=domain && ""!=domain){
            cookie.setDomain(domain);
        }
        response.addCookie(cookie);
    }

    /**
     * 检索所有Cookie封装到Map集合
     * @param request
     * @return
     * @author 苟治国
     */
    public static Map<String,String> getCookieMap(HttpServletRequest request){
        Map<String,String> cookieMap = new HashMap<String, String>();
        Cookie[] cookies = request.getCookies();
        if (null != cookies) {
            for (Cookie cookie : cookies) {
                cookieMap.put(cookie.getName(), cookie.getValue());
            }
        }
        return cookieMap;
    }

    /**
     * 过Key获取Value
     * @param request
     * @param key
     * @return
     * Map<String,String>
     */
    public static String getCookie(HttpServletRequest request, String key){
        Map<String, String> cookieMap = getCookieMap(request);
        if (cookieMap.containsKey(key)) {
            String cookieValue = (String)cookieMap.get(key);
            return cookieValue;
        } else {
            return null;
        }

    }
}
