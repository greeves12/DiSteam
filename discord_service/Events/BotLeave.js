const {EmbedBuilder} = require('discord.js');
const {removeGuild} = require('../API/Guilds');

module.exports = {onBotLeave};

async function onBotLeave(guild){
    var owner = await guild.fetchOwner();
    var embed = new EmbedBuilder()
    .setTitle("Sorry to see you go!")
    .setDescription("Before you go, your server's config will be saved for up to one year incase you plan on returning in the future.\n\nWe hope to see you again.");

    owner.send({embeds: [embed]});

    removeGuild(guild.id);
}