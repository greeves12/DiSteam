const {SlashCommandBuilder} = require('@discordjs/builders');
const { EmbedBuilder} = require('discord.js');
const fetch = require('node-fetch');
const { fetchServerConfig} = require('../Http/Requests');
const {buildAuthMessage} = require('../Utilities/MessageBuilder');
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
        var config = await fetchServerConfig(interaction.guild.id, interaction.guild.ownerId);
        fetch(process.env.TOKEN_LINK, { 
            method: 'POST', 
            body: JSON.stringify({ 
                discord_id: parseInt(interaction.user.id,10)
        }), 
        headers: { 
            'Content-type': 'application/json; charset=UTF-8',
             'api_key': process.env.API_KEY,  
        }, 
    }) 
    .then((response) => response.json()) 
    .then((json) => {
        var message = "This Discord has already been registered with a Steam account.";

        var embed = new EmbedBuilder()
        .setTitle("Sorry...")
        .setDescription("This Discord is already associated with a Steam account. Unfortunately, a Discord account can only be linked once.");

        if(json.token == "Already Registered"){
            return interaction.reply({embeds: [embed], ephemeral: true});
        }

        var resp = buildAuthMessage(json.token, config.epochTime, interaction.user);

        return interaction.reply(resp);
    })
    .catch(err => console.log(err))
    
    }
};