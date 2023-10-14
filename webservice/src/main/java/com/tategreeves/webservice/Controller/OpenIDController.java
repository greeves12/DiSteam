package com.tategreeves.webservice.Controller;

import com.tategreeves.webservice.Model.Token;
import com.tategreeves.webservice.Model.User;
import com.tategreeves.webservice.Service.AuthenticationService;
import com.tategreeves.webservice.Service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.expressme.openid.Association;
import org.expressme.openid.Endpoint;
import org.expressme.openid.OpenIdManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;

@RestController
public class OpenIDController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private UserService userService;

    @GetMapping("/openid")
    public void createRequest(@RequestParam("token") Optional<String> token, HttpServletRequest request, HttpServletResponse response) throws IOException {

        if(token.isPresent()) {
            String tok = token.get();
            if(!authenticationService.getByToken(tok).isPresent()){
                return_failed(response);
                return;
            }

            OpenIdManager manager = new OpenIdManager();

            manager.setRealm("DiSteam");
            manager.setReturnTo("https://steam-auth-bot-production.up.railway.app/openid?login=verify");

            Endpoint endpoint = manager.lookupEndpoint("https://steamcommunity.com/openid");
            System.out.println(endpoint);

            Association association = manager.lookupAssociation(endpoint);

            String url = manager.getAuthenticationUrl(endpoint, association);

            HttpSession session = request.getSession(true);
            session.setAttribute("token", tok);


            try {
                response.sendRedirect(url);
            } catch (IOException e) {
                System.out.println("e");
            }
            return;
        }

        HttpSession session = request.getSession(false);
        if(session == null){
            return_failed(response);
            return;
        }

        if(request.getParameter("login").equals("verify") && (session.getAttribute("token")) != null){

            String identity = request.getParameter("openid.identity");
            response.setContentType("text/html; charset=UTF-8");


            long steamID = Long.parseLong(identity.substring(37));
            String tok = (String) session.getAttribute("token");

            Optional<Token> newToken = authenticationService.getByToken(tok);
            if(newToken.isEmpty()){
                return_failed(response);
                session.invalidate();
                return;
            }

            long discordID = newToken.get().getDiscord_iD();

            User user = new User();
            user.setTime_verified(LocalDateTime.now());
            user.setDiscord_id(discordID);
            user.setSteam_id(steamID);

            userService.add_user(user);
            authenticationService.deleteToken(discordID);

            session.invalidate();

            return_success(response);
            return;
        }

        return_failed(response);
    }

    private void return_failed(HttpServletResponse response) throws IOException{
        response.sendRedirect("https://steamlink.vercel.app/failed.html");
        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
        response.setDateHeader("Expires", 0);
    }

    private void return_success(HttpServletResponse response) throws IOException{
        response.sendRedirect("https://steamlink.vercel.app/success.html");
        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
        response.setDateHeader("Expires", 0);
    }
}
