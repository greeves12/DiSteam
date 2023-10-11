package com.tategreeves.webservice.Controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.expressme.openid.Association;
import org.expressme.openid.Authentication;
import org.expressme.openid.Endpoint;
import org.expressme.openid.OpenIdManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Optional;

@RestController
public class OpenIDController {
    static final long ONE_HOUR = 3600000L;
    static final long TWO_HOUR = ONE_HOUR * 2L;
    static final String ATTR_MAC = "openid_mac";
    static final String ATTR_ALIAS = "openid_alias";

    @GetMapping("/openid")
    public void createRequest(@RequestParam("token") Optional<String> token, HttpServletRequest request, HttpServletResponse response){
        if(token.isPresent()) {
            OpenIdManager manager = new OpenIdManager();

            manager.setRealm("https://localhost:8080/openid");
            manager.setReturnTo("https://localhost:8080/openid?login=verify");

            Endpoint endpoint = manager.lookupEndpoint("https://steamcommunity.com/openid");
            System.out.println(endpoint);
            Association association = manager.lookupAssociation(endpoint);

            String url = manager.getAuthenticationUrl(endpoint, association);

            try {
                response.sendRedirect(url);
            } catch (IOException e) {
                System.out.println("e");
            }
        }else if(request.getParameter("login").equals("verify")){

            byte[] mac_key = (byte[]) request.getSession().getAttribute(ATTR_MAC);
            String alias = (String) request.getSession().getAttribute(ATTR_ALIAS);
            String identity = request.getParameter("openid.identity");
            response.setContentType("text/html; charset=UTF-8");
            System.out.println(identity);
        }
    }
}
