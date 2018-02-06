package demo.admin.controller;

import demo.core.ConfigUtil;
import demo.core.CookieUtil;
import demo.core.EhcacheUtil;
import demo.core.JsonUtil;
import demo.model.config.Sign;
import demo.service.interfaces.bs.UserService;
import demo.service.interfaces.core.EhcacheService;
import org.apache.commons.configuration.PropertiesConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Controller
@RequestMapping("home")
public class HomeController extends BaseController {

    /**
     * 用户业务接口
     */
    @Autowired
    private UserService userService;
    /**
     * 缓存业务接口
     */
    @Autowired
    private EhcacheService ehcacheService;
    //private Sign sign;

    /**
     * 首页
     * @return
     */
    @RequestMapping("index")
    public String index(HttpServletResponse response){
        //BsUser user = userService.get(1);

        try {

            String configMap = ConfigUtil.get("redis.properties","host");


            //ConfigUtil.

            //System.out.println(EhcacheUtil.getAuth("111"));
            String s = "{\"name\":\"liuzhao\"}";

            //String str = ehcacheService.getStr("abc");
            //System.out.println(str);

            Object ticket = ehcacheService.get("userAuth","ticket");
            System.out.println(ticket.toString());

            //String userSysNo = CookieUtil.getCookie(request,"userSysNo");
            //String ticket = CookieUtil.getCookie(request,"ticket");

            //CookieUtil.setCookie(response,"id",sign.getPublic_key(),120,"");

            //JSONObject object = JSON.parseObject(s);

            //UpdatePassWordPara updatePassWordPara = new UpdatePassWordPara();
            //updatePassWordPara.setSysNo(5);
            //updatePassWordPara.setPassWord("000000");
            //JResult result = userService.updatePassWord(updatePassWordPara);

            Integer i = 1;
        }catch (Exception ex){
            ex.printStackTrace();
        }

        return "home/index";
    }

    /**
     * 首页
     * @return
     */
    @RequestMapping("main")
    public String main(HttpServletRequest request){

        String id= CookieUtil.getCookie(request,"id");

        return "home/main";
    }
}
