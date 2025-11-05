package com.kim.back_spring.config;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.kim.back_spring.filter.JwtAuthenticationFilter;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Configuration // Spring 설정 클래스로 등록됨
@EnableWebSecurity // Spring Security 기능 활성화
@RequiredArgsConstructor // final 필드 자동 생성자 주입 (Lombok)
public class WebSecurityConfig {
    
    private final JwtAuthenticationFilter JwtAuthenticationFilter;

    @Bean //스프링 컨테이너에 의해 관리되는 재사용 가능한 소프트웨어 컴포넌트
    protected SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception{
        httpSecurity
            .cors(cors -> cors.configurationSource(corsConfigrationSource()))
            .csrf(CsrfConfigurer::disable)
            .httpBasic(HttpBasicConfigurer::disable)
            .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(request -> request
                .requestMatchers("/","/api/v1/auth**","/api/v1/search/**","/file/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/board/**","/api/v1/user/*").permitAll()
                .anyRequest().authenticated()
            )
            .exceptionHandling(exceptionHandling -> exceptionHandling
                .authenticationEntryPoint(new FailedAuthenticationEntryPoint())
            )
            .addFilterBefore(JwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
            
        return httpSecurity.build();
    }
    
    @Bean
    protected CorsConfigurationSource corsConfigrationSource(){

        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of("http://localhost:3000")); // React 개발 서버
        configuration.addAllowedMethod("*");   // 모든 HTTP 메서드 허용
        configuration.addAllowedHeader("*");   // 모든 요청 헤더 허용
        configuration.addExposedHeader("*");   // 응답 헤더 노출
        configuration.setAllowCredentials(true); // 인증정보(쿠키, 토큰) 허용

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}

class FailedAuthenticationEntryPoint implements AuthenticationEntryPoint{

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException authException) throws IOException, ServletException {

        response.setContentType(("application/json"));
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 403 Error
        response.getWriter().write("{\"code\": \"AF\", \"message\": \"Authorization Failed\"}");
    }

}
