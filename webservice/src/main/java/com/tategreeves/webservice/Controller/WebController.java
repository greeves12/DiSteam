package com.tategreeves.webservice.Controller;

import com.tategreeves.webservice.Model.Panel;
import com.tategreeves.webservice.Service.PanelService;
import com.tategreeves.webservice.Service.ServerConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebController {
    @Autowired
    private PanelService authentication;

    @Autowired
    private ServerConfigService serverConfigService;


}
