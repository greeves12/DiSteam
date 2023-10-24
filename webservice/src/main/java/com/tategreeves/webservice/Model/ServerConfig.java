package com.tategreeves.webservice.Model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "config")
public class ServerConfig {
    @Id
    private long server_id;
    private long owner_id;

    public long getOwner_id() {
        return owner_id;
    }

    public void setOwner_id(long owner_id) {
        this.owner_id = owner_id;
    }

    private List<Long> on_join_role;
    private List<Long> verified_role;
    private long epoch_time;

    @JsonCreator
    public ServerConfig(@JsonProperty("server_id") long server_id, @JsonProperty("owner_id") long owner_id, @JsonProperty("on_join_role") List<Long> on_join_role, @JsonProperty("verified_role") List<Long> verified_role, @JsonProperty("epoch_time") long epoch_time) {
        this.server_id = server_id;
        this.verified_role = verified_role;
        this.on_join_role = on_join_role;
        this.owner_id = owner_id;
        this.epoch_time = epoch_time;
    }

    public long getServer_id() {
        return server_id;
    }

    public void setServer_id(long server_id) {
        this.server_id = server_id;
    }

    public List<Long> get_join_role() {
        return on_join_role;
    }

    public void set_join_role(List<Long> on_join_role) {
        this.on_join_role = on_join_role;
    }

    public List<Long> getVerified_role() {
        return verified_role;
    }

    public void setVerified_role(List<Long> verified_role) {
        this.verified_role = verified_role;
    }

    public long getEpochTime() {
        return epoch_time;
    }

    public void setEpochTime(long epochTime) {
        this.epoch_time = epochTime;
    }
}
