package demo.admin.handler;

import demo.auth.AuthCode;
import demo.auth.CheckAuth;
import demo.core.CookieUtil;
import demo.core.JsonUtil;
import demo.model.JResult;
import demo.model.output.bs.auth.TicketUser;
import demo.service.interfaces.bs.UserService;
import demo.service.interfaces.core.EhcacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
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
     * 用户
     */
    @Autowired
    private UserService userService;
    /**
     * 缓存
     */
    @Autowired
    private EhcacheService ehcacheService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception{
        if (handler instanceof HandlerMethod){
            HandlerMethod headler = (HandlerMethod) handler;
            System.out.println("当前执行的对象是"+headler.getMethod());

            String m = request.getMethod();

            CheckAuth checkAuth = headler.getMethodAnnotation(CheckAuth.class);
            if (null != checkAuth) {
                //用户编号
                String sysno = CookieUtil.getCookie(request,"sysno");
                if(null==sysno){
                    //TODO
                    response.sendError(403,"权限不足");
                }
                if(checkAuth.authCode()!=null && checkAuth.authCode().length>0){
                    //将接收的权限写入List<String>
                    List<String> authCode = new ArrayList<String>();
                    for(AuthCode item:checkAuth.authCode()){
                        authCode.add(item.getIndex());
                    }

                    //验证
                    boolean checkResult = this.checkAuth(authCode,Integer.parseInt(sysno));
                    if(request.getMethod().equals("POST")){
                        if(checkResult){
                            return true;
                        }else{
                            JResult result = new JResult();
                            result.setStatus(false);
                            result.setMessage("对不起，权限不足");
                            String json = JsonUtil.objToJson(result);
                            response.setCharacterEncoding("UTF-8");
                            response.setContentType("application/json; charset=utf-8");
                            response.getWriter().write(json);
                        }
                    }else{
                        if(checkResult){
                            return true;
                        }else{
                            response.sendError(403,"权限不足");
                        }
                    }

                }else{
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * 权限验证
     * @param authCode
     * @return boolean
     * @author 苟治国
     */
    private boolean checkAuth(List<String> authCode,Integer sysno){

        List<String> ticket = null;
        //是否存在
        boolean exist = ehcacheService.exist("userAuth","ticket");
        if(exist){
            List<String> permissionCode= userService.getPermissionCode(sysno);
            if(permissionCode!=null && permissionCode.size()>0){
                Object object  = ehcacheService.get("userAuth","ticket", JsonUtil.objToJson(permissionCode));
                if(object!=null){
                    ticket = JsonUtil.jsonToListObj(object.toString(),String.class);
                }
            }
        }else{
            Object object  = ehcacheService.get("userAuth","ticket");
            if(object!=null){
                ticket = JsonUtil.jsonToListObj(object.toString(),String.class);
            }
        }

        if(null!=ticket){
            for(String item:ticket) {
                boolean checkResult = authCode.contains(item);
                if(checkResult){
                    return true;
                }
            }
        }
        return false;
    }
}
