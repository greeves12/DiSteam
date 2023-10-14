package com.tategreeves.webservice.Model;

import java.time.LocalDateTime;

public class ServerBan {
    private long serverID;
    private String reason;
    private LocalDateTime timeBanned;

    public long getServerID() {
        return serverID;
    }

    public void setServerID(long serverID) {
        this.serverID = serverID;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public LocalDateTime getTimeBanned() {
        return timeBanned;
    }

    public void setTimeBanned(LocalDateTime timeBanned) {
        this.timeBanned = timeBanned;
    }
}
