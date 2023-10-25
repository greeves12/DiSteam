package com.tategreeves.webservice.Controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tategreeves.webservice.JSON.PlayerInformation;
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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.Optional;

@RestController
public class OpenIDController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private UserService userService;

    @Value("${steam.api}")
    private String steamkey;

    @GetMapping("/openid")
    public void createRequest(@RequestParam("token") Optional<String> token, HttpServletRequest request, HttpServletResponse response) throws IOException {
        //If token is in the field then proceed with setting up authentication
        if(token.isPresent()) {
            String tok = token.get();
            if(!authenticationService.getByToken(tok).isPresent()){
                return_failed(response);
                return;
            }

            OpenIdManager manager = new OpenIdManager();

            manager.setRealm("https://steam-auth-bot-production.up.railway.app/openid");
            manager.setReturnTo("https://steam-auth-bot-production.up.railway.app/openid?login=verify");

            //manager.setRealm("http://localhost:8080/openid");
            //manager.setReturnTo("http://localhost:8080/openid?login=verify");


            Endpoint endpoint = manager.lookupEndpoint("https://steamcommunity.com/openid");
            System.out.println(endpoint);

            Association association = manager.lookupAssociation(endpoint);

            String url = manager.getAuthenticationUrl(endpoint, association);

            //Create a private session that sets the user token (identifier for discord account lookup)
            HttpSession session = request.getSession(true);
            session.setAttribute("token", tok);


            try {
                response.sendRedirect(url);
            } catch (IOException e) {
                System.out.println("e");
            }
            return;
        }

        //Check if the session is null (to prevent forced authentication)
        HttpSession session = request.getSession(false);
        if(session == null){
            return_failed(response);
            return;
        }

        if(request.getParameter("login").equals("verify") && (session.getAttribute("token")) != null){

            String identity = request.getParameter("openid.identity");
            response.setContentType("text/html; charset=UTF-8");


            String steamID = identity.substring(37);
            String tok = (String) session.getAttribute("token");

            //Perform lookup in the database to ensure the token is valid and pairs wih a discord id
            Optional<Token> newToken = authenticationService.getByToken(tok);
            if(newToken.isEmpty()){
                return_failed(response);
                session.invalidate();
                return;
            }

            String discordID = newToken.get().getDiscord_iD();

            //Perform steam api lookup. Returns a JSON object defined as PlayerInformation.
            URL url = new URL("http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+steamkey+"&steamids="+steamID);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            ObjectMapper mapper = new ObjectMapper();
            JsonNode node = mapper.readTree(connection.getInputStream());

            PlayerInformation playerInformation = mapper.readValue(node.get("response").get("players").toString(), PlayerInformation[].class)[0];

            User user = new User();
            user.setTime_verified(LocalDateTime.now());
            user.setDiscord_id(discordID);
            user.setSteam_id(steamID);
            user.setSteam_name(playerInformation.getPersonaname());
            user.setAgeOfAccount(playerInformation.getTimecreated());

            userService.add_user(user);
            authenticationService.updateVerification(newToken.get(), true);

            session.invalidate();

            return_success(response, playerInformation.getPersonaname());
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

    private void return_success(HttpServletResponse response, String steamName) throws IOException{
        response.sendRedirect("https://steamlink.vercel.app/success.html?username=" + steamName);
        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
        response.setDateHeader("Expires", 0);
    }
}
