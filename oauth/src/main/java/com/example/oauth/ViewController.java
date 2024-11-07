package com.example.oauth;

import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@Controller
public class ViewController {

    @GetMapping("/profile")
    public String profile(OAuth2AuthenticationToken token, Model model) {
        Object name = token.getPrincipal().getAttribute("name");
        Object email = token.getPrincipal().getAttribute("email");
        Object photo = token.getPrincipal().getAttribute("picture");
    
        System.out.println("Name: " + name);
        System.out.println("Email: " + email);
        System.out.println("Photo: " + photo);
    
        model.addAttribute("name", name != null ? name : "Name not available");
        model.addAttribute("email", email != null ? email : "Email not available");
        model.addAttribute("photo", photo != null ? photo : "/path/to/default-photo.jpg");
    
        return "user_profile";
    }
    
    

    @GetMapping("/login")
    public String login() {
        return "custom_login";
    }

    @GetMapping("/error")
    public String error() {
        return "oops";
    }
}
