package com.example.oauth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableWebSecurity
public class JetSetGoOAuthApplication {

	public static void main(String[] args) {
		SpringApplication.run(JetSetGoOAuthApplication.class, args);
	}

}
