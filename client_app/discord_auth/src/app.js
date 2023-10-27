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

        return res.redirect("http://localhost:3000/success?access_token=" + access_token + "&token_type=" + token_type);
    }catch(error){
        console.log('Error',error)
        return res.send('Some error occurred! ')
    }
})

app.listen(4000);