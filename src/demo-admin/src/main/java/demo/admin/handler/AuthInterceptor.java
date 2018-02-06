package demo.admin.handler;

import demo.auth.AuthCode;
import demo.auth.CheckAuth;
import demo.core.CookieUtil;
import demo.model.output.bs.auth.TicketUser;
import demo.service.interfaces.core.EhcacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.List;

/**
 * 权限验证
 * @author 苟治国 2017/6/30
 */
public class AuthInterceptor extends HandlerInterceptorAdapter {
    @Resource
    protected HttpServletRequest request;
    /**
     * 缓存
     */
    @Autowired
    private EhcacheService ehcacheService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception{
        if (handler instanceof HandlerMethod){
            HandlerMethod headler = (HandlerMethod) handler;
            CheckAuth checkAuth = headler.getMethodAnnotation(CheckAuth.class);
            if (null != checkAuth) {
                if(checkAuth.authCode()!=null && checkAuth.authCode().length>0){
                    if(this.checkAuth(checkAuth.authCode())){
                        //System.out.println(ticket.toString());
                        System.out.println(checkAuth.authCode());
                    }else{
                        return false;
                    }
                }else{
                    return false;
                }
            }
        }
        return true;
    }

    private boolean checkAuth(AuthCode[] authCode){
        TicketUser ticket = ehcacheService.getTicketUser();
        if(null!=ticket){
            //List<String>  ss = Arrays.asList(authCode);

            //for(String aa:Arrays.asList(authCode)){

            //}
            for(String item:ticket.getPermissionsCode()) {
                boolean ss = Arrays.asList(authCode).contains(item);
                if(ss){

                }
            }
            //System.out.println(ticket.toString());
            //System.out.println(checkAuth.authCode());
        }else{
            return false;
        }
        return true;
    }
}
