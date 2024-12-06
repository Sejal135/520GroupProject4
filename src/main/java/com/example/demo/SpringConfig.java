package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;


// @Configuration
// public class SpringConfig {

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         return http
//                 .authorizeHttpRequests(registry -> {
//                     registry.requestMatchers("/", "/login").permitAll();
//                     registry.anyRequest().authenticated();
//                 })
//                 .oauth2Login(oauth2login -> {
//                     oauth2login
//                             .loginPage("/login")
//                             .successHandler((request, response, authentication) -> response.sendRedirect("/profile"));
//                 })
//                 .build();
//     }
// }

@EnableAutoConfiguration
@Configuration
@ComponentScan

public class SpringConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf().disable()
                .authorizeHttpRequests(registry -> {
                    registry.requestMatchers("/", "/login", "/*").permitAll();
                    registry.requestMatchers(HttpMethod.POST, "/*").permitAll();
                    registry.anyRequest().authenticated();
                })
                .oauth2Login(oauth2login -> {
                    oauth2login
                            .loginPage("/login")
                            .defaultSuccessUrl("/profile", true);
                })
                .build();
    }
}

