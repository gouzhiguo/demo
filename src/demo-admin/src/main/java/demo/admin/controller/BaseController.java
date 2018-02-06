package demo.admin.controller;

import demo.service.interfaces.core.EhcacheService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * 控制器
 * @author 苟治国
 */
public class BaseController {

    @Resource
    protected HttpServletRequest request;
    /**
     * 缓存业务接口
     */
    @Autowired
    private EhcacheService ehcacheService;

}
