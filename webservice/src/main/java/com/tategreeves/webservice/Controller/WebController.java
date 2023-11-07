package com.tategreeves.webservice.Controller;

import com.tategreeves.webservice.Model.Panel;
import com.tategreeves.webservice.Model.ServerConfig;
import com.tategreeves.webservice.Service.PanelService;
import com.tategreeves.webservice.Service.ServerConfigService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

@CrossOrigin(origins = "*", exposedHeaders =  {"*"})
@RestController
public class WebController {
    @Autowired
    private PanelService authentication;

    @Autowired
    private ServerConfigService serverConfigService;

    @Value("${api.key}")
    private String apiKey;


    @GetMapping("/service/requests/get/config")
    public ServerConfig getConfig(@RequestHeader("discord-id") String discord_id, @RequestHeader("auth-token") String authToken, HttpServletResponse response, @RequestHeader("server-id") String serverId){
        Panel client = new Panel(discord_id);
        client.setAuth_token(authToken);


        if(!authentication.tokenExists(client)){
            System.out.println("f");
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


    @PostMapping("/service/requests/post/auth/access")
    public Map<String, String> getToken(@RequestHeader("discord-id") String discordId, @RequestHeader("api-key") String apiKey, HttpServletResponse response){
        if(!this.apiKey.equals(apiKey)){
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            return null;
        }

        Panel client = authentication.getUserAuthToken(discordId);

        return Collections.singletonMap("token", client.getAuth_token());
    }
}
