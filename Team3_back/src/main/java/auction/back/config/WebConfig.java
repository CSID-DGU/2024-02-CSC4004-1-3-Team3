package auction.back.config;



import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;



@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(final CorsRegistry registry ){
        registry.addMapping("/**")
                .allowedOrigins("https://web-auction-m3egx220d3e063ff.sel4.cloudtype.app")
                .allowedMethods("PATCH","GET","POST","PUT","DELETE","HEAD","OPTIONS")
                .allowedHeaders("*")
                .exposedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
