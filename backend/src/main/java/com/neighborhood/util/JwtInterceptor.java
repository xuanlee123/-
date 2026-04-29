package com.neighborhood.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class JwtInterceptor implements HandlerInterceptor {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if ("OPTIONS".equals(request.getMethod())) {
            return true;
        }

        String token = request.getHeader("Authorization");
        String path = request.getRequestURI();

        // 邻里圈相关接口：允许未登录访问，登录时提取用户信息
        if (path.startsWith("/neighborhood/")) {
            if (token == null || !token.startsWith("Bearer ")) {
                return true; // 邻里圈允许未登录访问
            }
            token = token.substring(7);
            if (jwtUtil.validateToken(token)) {
                Long userId = jwtUtil.getUserIdFromToken(token);
                Integer role = jwtUtil.getRoleFromToken(token);
                request.setAttribute("userId", userId);
                request.setAttribute("role", role);
            }
            return true;
        }

        if (token == null || !token.startsWith("Bearer ")) {
            response.setStatus(401);
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write("{\"code\":401,\"msg\":\"未登录或登录已过期\"}");
            return false;
        }

        token = token.substring(7);

        if (!jwtUtil.validateToken(token)) {
            response.setStatus(401);
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write("{\"code\":401,\"msg\":\"Token已过期\"}");
            return false;
        }

        Long userId = jwtUtil.getUserIdFromToken(token);
        Integer role = jwtUtil.getRoleFromToken(token);

        request.setAttribute("userId", userId);
        request.setAttribute("role", role);

        return true;
    }
}
