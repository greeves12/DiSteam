package com.tategreeves.webservice.Repository;

import com.tategreeves.webservice.Model.Token;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface AuthenticationRepository extends MongoRepository<Token, String> {

    @Query("{ token: ?0 }")
    boolean tokenExists(String token);

    @Query("{ token: ?0 }")
    Optional<Token> getByToken(String token);
}
