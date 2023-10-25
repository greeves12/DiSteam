package com.tategreeves.webservice.Repository;

import com.tategreeves.webservice.Model.ServerConfig;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ServerConfigRepository extends MongoRepository<ServerConfig, String> {
}
