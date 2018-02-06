package demo.model.config;

import org.springframework.beans.factory.annotation.Value;

/**
 * 加密
 */
public class Sign {
    /**
     * 公钥
     */
    @Value("${public_key}")
    private String public_key;

    public String getPublic_key() {
        return public_key;
    }

    public void setPublic_key(String public_key) {
        this.public_key = public_key;
    }
}
