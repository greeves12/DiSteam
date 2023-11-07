package com.tategreeves.webservice.Service;

import com.tategreeves.webservice.Model.Panel;
import com.tategreeves.webservice.Repository.PanelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class PanelService {

    @Autowired
    private PanelRepository repository;

    public Panel getUserAuthToken(String discordId){
        Optional<Panel> client = repository.findById(discordId);

        return client.orElseGet(() -> generateAuthToken(discordId));

    }

    private Panel generateAuthToken(String discordId){
        Panel client = new Panel(discordId);
        client.setAuth_token(UUID.randomUUID().toString());
        return repository.save(client);
    }

    public boolean tokenExists(Panel client){
        Optional<Panel> result = repository.findById(client.getDiscord_id());

        if(result.isEmpty()){
            return false;
        }

        if(!result.get().getAuth_token().equals(client.getAuth_token())){
            return false;
        }

        return true;
    }
}
