package com.tategreeves.webservice.Model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "authentication")
public class Token {
    @Id
    private String discord_id;
    private String token;
    private boolean verified;


    @JsonCreator
    public Token(@JsonProperty("discord_id") String discord_id) {
        this.discord_id = discord_id;
    }

    public String getDiscord_iD() {
        return discord_id;
    }

    public void setDiscord_iD(String discord_iD) {
        this.discord_id = discord_iD;
    }

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
