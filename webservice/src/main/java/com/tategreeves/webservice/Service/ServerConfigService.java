package com.tategreeves.webservice.Service;

import com.tategreeves.webservice.Model.ServerConfig;
import com.tategreeves.webservice.Repository.ServerConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

@Service
public class ServerConfigService {

    @Autowired
    private ServerConfigRepository repository;

    private Optional<ServerConfig> configExists(String serverId){
        return repository.findById(serverId);
    }

    public ServerConfig getConfig(String serverId, String ownerId){
        long yearInEpoch = 31556926;
        Optional<ServerConfig> config = configExists(serverId);

        if(config.isPresent()){
            return config.get();
        }

        ServerConfig newConfig = new ServerConfig(serverId, ownerId,new ArrayList<>(), new ArrayList<>(), yearInEpoch);
        newConfig.setUUID(UUID.randomUUID().toString());

        return repository.save(newConfig);
    }

    public ServerConfig updateConfig(ServerConfig config){
        return repository.save(config);
    }
}
