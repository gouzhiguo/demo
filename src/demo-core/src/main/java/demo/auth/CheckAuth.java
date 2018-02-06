package demo.auth;

import java.lang.annotation.*;

/**
 * 权限码
 * @author 苟治国 2017/6/30
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface CheckAuth {
    AuthCode[] authCode();
}
