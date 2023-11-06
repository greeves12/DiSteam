const axios = require('axios');
let dotenv = require('dotenv').config()


var express = require('express');
var app = express();


app.get('/auth', async (req, res) => {
    let code = req.query.code;
    let user;
    let params = new URLSearchParams();
    params.append('client_id', process.env.CLIENT_ID);
    params.append('client_secret', process.env.CLIENT_SECRET);
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', "http://localhost:4000/auth");

    try{
        const response= await axios.post('https://discord.com/api/oauth2/token',params)
        const { access_token,token_type}=response.data;

        const {id} = (await axios.get("https://discord.com/api/users/@me", {
            headers: {
                authorization: `${token_type} ${access_token}`
            }
        })).data;

        const {token} = (await axios.request({
            method: "post",
            url: "http://localhost:8080/service/requests/post/auth/access",
            headers: {
                'api-key': process.env.API,
                'discord-id': id
            },
        })).data;

        return res.redirect("http://localhost:3000/success?access_token=" + access_token + "&token_type=" + token_type + "&auth=" + token);
    }catch(error){
        console.log('Error',error)
        return res.send('Some error occurred! ')
    }
})

app.listen(4000);