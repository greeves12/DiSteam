package com.tategreeves.webservice.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.HashMap;

@Document(collection = "users")
public class User {
    @Id
    private long discord_id;
    private LocalDateTime time_verified;
    private long steam_id;
    private HashMap<Long, Integer> bans;
    private String steam_name;

    public void setSteam_name(String steam_name){
        this.steam_name = steam_name;
    }

    public String getSteam_name(){
        return steam_name;
    }

    public long getDiscord_id() {
        return discord_id;
    }

    public void setDiscord_id(long discord_id) {
        this.discord_id = discord_id;
    }

    public LocalDateTime getTime_verified() {
        return time_verified;
    }

    public void setTime_verified(LocalDateTime time_verified) {
        this.time_verified = time_verified;
    }

    public long getSteam_id() {
        return steam_id;
    }

    public void setSteam_id(long steam_id) {
        this.steam_id = steam_id;
    }

    public HashMap<Long, Integer> getBans() {
        return bans;
    }

    public void setBans(HashMap<Long, Integer> bans) {
        this.bans = bans;
    }
}
