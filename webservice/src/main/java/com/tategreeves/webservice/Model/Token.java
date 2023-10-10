package com.tategreeves.webservice.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collation = "authentication")
public class Token {
    @Id
    private int discord_iD;
    private String token;
    private boolean verified;

    public Token (){
        this.verified = false;
    }

    public int getDiscord_iD() {
        return discord_iD;
    }

    public void setDiscord_iD(int discord_iD) {
        this.discord_iD = discord_iD;
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
