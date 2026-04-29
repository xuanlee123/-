package com.neighborhood.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .cors().and()
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeRequests()
                .antMatchers("/user/login", "/user/register", "/user/wxlogin").permitAll()
                .antMatchers("/user/admin/**").permitAll()
                .antMatchers("/announcement/**").permitAll()
                .antMatchers("/service/**").permitAll()
                .antMatchers("/activity/**").permitAll()
                .antMatchers("/neighborhood/**").permitAll()
                .antMatchers("/upload/**", "/uploads/**").permitAll()
                .antMatchers("/order/create", "/order/user/list", "/order/merchant/**", "/order/detail/**", "/order/pay/**", "/order/reject/**", "/order/accept/**", "/order/complete/**", "/order/cancel/**", "/order/refund/**", "/order/statistics").permitAll()
                .antMatchers("/order/admin/**").permitAll()
                .antMatchers("/merchant/**").permitAll()
                .antMatchers("/admin/**").permitAll()
                .antMatchers("/address/**").permitAll()
                .antMatchers("/evaluation/**").permitAll()
                .antMatchers("/swagger-resources/**", "/v2/api-docs", "/webjars/**", "/druid/**").permitAll()
                .anyRequest().permitAll();

        return http.build();
    }
}
