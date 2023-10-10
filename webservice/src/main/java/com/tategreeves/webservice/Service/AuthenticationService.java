package com.tategreeves.webservice.Service;

import com.tategreeves.webservice.Model.Token;
import com.tategreeves.webservice.Repository.AuthenticationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthenticationService {

    @Autowired
    private AuthenticationRepository repository;

    /*
    * Name: getToken
    * @param token - Token object
    * @return - An updated Token object
    * */
    public Token getToken(Token token){
        if(repository.findById(token.getDiscord_iD()).isPresent())
            return repository.findById(token.getDiscord_iD()).get();

        String uuid = UUID.randomUUID().toString();
        token.setToken(uuid);
        return repository.save(token);
    }

    /*
    * Name: updatedVerification
    * @param token - Token object
    * @param status - verification flag
    * @return - an updated Token object
    * */
    public Token updateVerification(Token token, boolean status){
        Token existingToken = repository.findById(token.getDiscord_iD()).get();
        existingToken.setVerified(status);
        return repository.save(existingToken);
    }

    /*
    * Name: deletedToken
    * @param discord_id - Unique discord id
    * @return - Message that object has been removed from the database
    * */
    public String deleteToken(long discord_id){
        repository.deleteById(discord_id);
        return "Entry with ID: " + discord_id + " deleted";
    }
}
