package com.tategreeves.webservice.Controller;

import com.tategreeves.webservice.Model.ServerConfig;
import com.tategreeves.webservice.Service.ServerConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ServerConfigController {

    @Autowired
    private ServerConfigService service;

    @PostMapping("/config/get")
    public ServerConfig createConfig(@RequestBody ServerConfig config){

        return service.getConfig(config.getServer_id(), config.getOwner_id());
    }
}
