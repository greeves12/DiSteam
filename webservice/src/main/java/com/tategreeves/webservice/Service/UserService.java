package com.tategreeves.webservice.Service;

import com.tategreeves.webservice.Model.Token;
import com.tategreeves.webservice.Model.User;
import com.tategreeves.webservice.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    /*
    * We don't need to check if the user already exists as we already check prior to creation an oauth token.
    *
    * */
    public void add_user(User user){
        repository.save(user);
    }

    public boolean user_exists(User user){
        if(repository.findById(user.getDiscord_id()).isPresent()){
            return true;
        }
        return false;
    }
}
