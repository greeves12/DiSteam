package com.tategreeves.webservice.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.HashMap;

@Document(collection = "users")
public class User {
    @Id
    private String discord_id;
    private LocalDateTime time_verified;
    private String steam_id;
    private HashMap<String, Integer> bans;
    private String steam_name;
    private long ageOfAccount;

    public long getAgeOfAccount() {
        return ageOfAccount;
    }

    public void setAgeOfAccount(long ageOfAccount) {
        this.ageOfAccount = ageOfAccount;
    }

    public void setSteam_name(String steam_name){
        this.steam_name = steam_name;
    }

    public String getSteam_name(){
        return steam_name;
    }

    public String getDiscord_id() {
        return discord_id;
    }

    public void setDiscord_id(String discord_id) {
        this.discord_id = discord_id;
    }

    public LocalDateTime getTime_verified() {
        return time_verified;
    }

    public void setTime_verified(LocalDateTime time_verified) {
        this.time_verified = time_verified;
    }

    public String getSteam_id() {
        return steam_id;
    }

    public void setSteam_id(String steam_id) {
        this.steam_id = steam_id;
    }

    public HashMap<String, Integer> getBans() {
        return bans;
    }

    public void setBans(HashMap<String, Integer> bans) {
        this.bans = bans;
    }
}
