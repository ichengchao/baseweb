package baseweb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication
@EnableAspectJAutoProxy(proxyTargetClass = true)
@ServletComponentScan("baseweb")

public class MyBaseWebApplication {

    public static void main(String[] args) {
        SpringApplication.run(MyBaseWebApplication.class, args);
    }

}
