package com.tategreeves.webservice.Controller;

import com.tategreeves.webservice.Model.Token;
import com.tategreeves.webservice.Service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AuthenticationController {

    @Autowired
    private AuthenticationService service;


    /*
    * Name: createToken
    * @param discord_id - A unique discord id
    * @return - Token in a string in JSON format
    * */
    @PostMapping("/auth")
    public Token createToken(@RequestBody Token token){
        return service.getToken(token);
    }

    @PostMapping("/auth/verified")
    public List<Token> getMembersToPromote(){
        return service.getVerifiedTokens();
    }

    @PostMapping("/auth/delete")
    public void delete(@RequestBody Token token){
        service.deleteToken(token.getDiscord_iD());
    }
}
