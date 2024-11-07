package com.example.oauth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;


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
                .authorizeHttpRequests(registry -> {
                    registry.requestMatchers("/", "/login").permitAll();
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

