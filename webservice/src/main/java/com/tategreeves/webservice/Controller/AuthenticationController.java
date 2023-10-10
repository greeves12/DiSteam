package com.tategreeves.webservice.Controller;

import com.tategreeves.webservice.Model.Token;
import com.tategreeves.webservice.Service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public String createToken(@RequestParam Integer discord_id){
        Token token = new Token();
        token.setDiscord_iD(discord_id);

        return service.getToken(token).getToken();
    }
}
