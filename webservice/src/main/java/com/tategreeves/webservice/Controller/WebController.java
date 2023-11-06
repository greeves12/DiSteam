package com.tategreeves.webservice.Controller;

import com.tategreeves.webservice.Model.Panel;
import com.tategreeves.webservice.Model.ServerConfig;
import com.tategreeves.webservice.Service.PanelService;
import com.tategreeves.webservice.Service.ServerConfigService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class WebController {
    @Autowired
    private PanelService authentication;

    @Autowired
    private ServerConfigService serverConfigService;


    @GetMapping("/service/requests/get/config")
    public ServerConfig getConfig(@RequestHeader("discord-id") String discord_id, @RequestHeader("auth-token") String authToken, HttpServletResponse response, @RequestHeader("server-id") String serverId){
        Panel client = new Panel(discord_id);
        client.setAuth_token(authToken);

        if(!authentication.tokenExists(client)){
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return null;
        }

        return serverConfigService.getConfig(serverId, client.getDiscord_id());
    }

    @PostMapping("/service/requests/post/config")
    public void updateConfig(@RequestHeader("discord-id") String discord_id, @RequestHeader("auth-token") String authToken, HttpServletResponse response, @RequestBody ServerConfig config){
        Panel client = new Panel(discord_id);
        client.setAuth_token(authToken);

        if(!authentication.tokenExists(client)){
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        serverConfigService.updateConfig(config);
    }
}
