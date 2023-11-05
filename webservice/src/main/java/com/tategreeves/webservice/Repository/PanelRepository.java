package com.tategreeves.webservice.Repository;

import com.tategreeves.webservice.Model.Panel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PanelRepository extends MongoRepository<Panel, String> {
}
