const {SlashCommandBuilder} = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
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
    .then((json) => {
        var message = "This Discord has already been registered with a Steam accocunt.";

        var embed = new EmbedBuilder()
        .setTitle("Sorry...")
        .setDescription("This Discord is already associated with a Steam account. Unfortunatley, a Discord account can only be linked once.");

        if(json.token == "Already Registered"){
            return interaction.reply({embeds: [embed]});
        }

        embed = new EmbedBuilder()
        .setTitle("Verification Alert")
        .setDescription(`Hello ${interaction.user}\n\nA requirement of this server is that each user must link their Discord with a Steam account. Don't worry though, this process won't take up much of your time.\n\nOnce you're ready to get started, click the button below.`);

        const row = new ActionRowBuilder();
        row.addComponents(new ButtonBuilder()
        .setLabel("Verify Me")
        .setStyle(ButtonStyle.Link)
        .setURL(`https://steamlink.vercel.app/index.html?token=${json.token}`)
        );

        return interaction.reply({embeds: [embed], components: [row], ephemeral: true});
    })
    .catch(err => console.log(err))
    
    }
};