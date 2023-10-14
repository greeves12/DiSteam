const {SlashCommandBuilder} = require('@discordjs/builders');
const fetch = require('node-fetch');
require('dotenv').config();

/*
* Purpose is to create a command that links a user's discord and steam account.
*
* We make a post request with the API key to retrieve a state token for completing the link on the webserver.
* Assuming that the user is already linked, an empty JSON is sent back from the server, if account is NOT linked then it will send back a token
* to form the URL that is then sent to the user who executed the command.
*/
module.exports = {
    data: new SlashCommandBuilder()
    .setName("link")
    .setDescription("Link your Steam with Discord"),
    async execute (interaction){
        fetch('https://steam-auth-bot-production.up.railway.app/auth', { 
            method: 'POST', 
            body: JSON.stringify({ 
                discord_id: parseInt(interaction.user.id,10)
        }), 
        headers: { 
            'Content-type': 'application/json; charset=UTF-8',
             api_key: process.env.API_KEY,  
        }, 
    }) 
    .then((response) => response.json()) 
    .then((json) => interaction.reply({content: `Click the following URL to complete account link.\n https://steamlink.vercel.app/index.html?token=${json.token}`, ephemeral:  true})) 
    .catch(err => console.log(err))
    
    }
};