package com.tategreeves.webservice.Repository;

import com.tategreeves.webservice.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}
