package com.tategreeves.webservice.Model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "config")
public class ServerConfig {
    private int server_id;
    private int on_join_role;
    private int verified_role;
    private boolean auto_promote;



}
