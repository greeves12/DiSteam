const {SlashCommandBuilder} = require('@discordjs/builders');
const {fetch} = require('node-fetch');
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
        fetch('', { 
            method: 'POST', 
            body: JSON.stringify({ 
                api_key: process.env.API_KEY, 
                id: interaction.user.id
        }), 
        headers: { 
            'Content-type': 'application/json; charset=UTF-8', 
        }, 
    }) 
    .then((response) => response.json()) 
    .then((json) => interaction.reply({content: `Click the following URL to complete account link.\n https://link.com/openid?state=${json.token}`, ephemeral:  true})) 
    .catch(err => console.log(err))
    
    }
};