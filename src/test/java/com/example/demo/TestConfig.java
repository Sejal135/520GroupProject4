package com.example.demo;

import com.example.demo.models.repositories.GroupChatRepository;
import com.example.demo.services.*;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;

@TestConfiguration
public class TestConfig {

    @Bean
    public CommentsService commentsService() {
        return new CommentsService();
    }

    @Bean
    public UsersService usersService() {
        return new UsersService();
    }

    @Bean
    public PlacesService placesService() {
        return new PlacesService();
    }

    @Bean
    public ExplorerHomepageService explorerHomepageService() {
        return new ExplorerHomepageService();
    }

    @Bean
    public ReviewsService reviewsService() {
        return new ReviewsService();
    }

    @Bean
    public GroupChatInfoService groupChatInfoService() {
        return new GroupChatInfoService();
    }

    @Bean
    public PlusOneService plusOneService() {
        return new PlusOneService();
    }
}
