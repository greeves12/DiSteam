package com.tategreeves.webservice.Controller;

import com.tategreeves.webservice.Model.User;
import com.tategreeves.webservice.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping("/members/get")
    public User getMember(@RequestBody User user){
        Optional<User> val = service.user_exists(user);
        
        return val.orElse(null);
    }
}
