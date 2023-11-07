package com.tategreeves.webservice.Model;

import org.springframework.data.annotation.Id;

public class Panel {

    @Id
    private String discord_id;
    private String auth_token;

    public Panel(String discord_id){
        this.discord_id = discord_id;
    }

    public String getDiscord_id() {
        return discord_id;
    }

    public void setDiscord_id(String discord_id) {
        this.discord_id = discord_id;
    }

    public String getAuth_token() {
        return auth_token;
    }

    public void setAuth_token(String auth_token) {
        this.auth_token = auth_token;
    }
}
