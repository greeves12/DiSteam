package com.tategreeves.webservice.Controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.expressme.openid.Association;
import org.expressme.openid.Authentication;
import org.expressme.openid.Endpoint;
import org.expressme.openid.OpenIdManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

@RestController
public class OpenIDController {

    @GetMapping("/openid")
    public void createRequest(@RequestParam("token") Optional<String> token, HttpServletRequest request, HttpServletResponse response) throws IOException {

        if(token.isPresent()) {
            OpenIdManager manager = new OpenIdManager();

            manager.setRealm("http://localhost:8080/openid");
            manager.setReturnTo("http://localhost:8080/openid?login=verify");

            Endpoint endpoint = manager.lookupEndpoint("https://steamcommunity.com/openid");
            System.out.println(endpoint);

            Association association = manager.lookupAssociation(endpoint);

            String url = manager.getAuthenticationUrl(endpoint, association);

            System.out.println(request.getRemoteAddr());

            HttpSession session = request.getSession(true);
            session.setAttribute(request.getRemoteAddr(), token);

            try {
                response.sendRedirect(url);
            } catch (IOException e) {
                System.out.println("e");
            }
            return;
        }

        HttpSession session = request.getSession(false);
        if(session == null){
            response.sendRedirect("http://localhost:8080/failed.html");
            response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
            response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
            response.setDateHeader("Expires", 0);
            return;
        }

        if(request.getParameter("login").equals("verify") && (session.getAttribute(request.getRemoteAddr())) != null){

            String identity = request.getParameter("openid.identity");
            response.setContentType("text/html; charset=UTF-8");

            System.out.println(request.getRemoteAddr());
            System.out.println(identity.substring(37));
            session.invalidate();

            response.sendRedirect("http://localhost:8080/success.html");
            response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
            response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
            response.setDateHeader("Expires", 0);

            return;
        }

        response.sendRedirect("http://localhost:8080/failed.html");
        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
        response.setDateHeader("Expires", 0);
    }
}
