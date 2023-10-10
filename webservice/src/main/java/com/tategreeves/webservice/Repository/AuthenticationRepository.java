package com.tategreeves.webservice.Repository;

import com.tategreeves.webservice.Model.Token;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AuthenticationRepository extends MongoRepository<Token, Integer> {
}
