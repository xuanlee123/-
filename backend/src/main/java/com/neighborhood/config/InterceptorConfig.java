package com.neighborhood.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import com.neighborhood.util.JwtInterceptor;
import org.springframework.beans.factory.annotation.Autowired;

@Configuration
public class InterceptorConfig implements WebMvcConfigurer {

    @Autowired
    private JwtInterceptor jwtInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(jwtInterceptor)
                .addPathPatterns("/**")
                .excludePathPatterns(
                    "/user/login",
                    "/user/register",
                    "/user/wxlogin",
                    "/user/admin/**",
                    "/announcement/list",
                    "/announcement/detail/**",
                    "/service/**",
                    "/activity/list",
                    "/activity/detail/**",
                    "/neighborhood/list",
                    "/neighborhood/detail/**",
                    "/neighborhood/comment/list",
                    "/upload/**",
                    "/uploads/**",
                    "/swagger-resources/**",
                    "/v2/api-docs",
                    "/webjars/**",
                    "/druid/**"
                );
    }
}
