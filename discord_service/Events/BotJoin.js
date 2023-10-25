const {fetchServerConfig} = require('../Http/Requests');
const {addGuild} = require('../API/Guilds');
const {EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');

module.exports = {botJoin};

async function botJoin(guild){
    var owner = await guild.fetchOwner().then(fetchServerConfig(guild.id, guild.ownerId));
    await guild.members.fetch();

    var embed = new EmbedBuilder()
    .setTitle("Thank you for inviting me to your server.")
    .setDescription("Currently, you are running the default configurations for this server. We strongly recommend that you head over to the client portal" +
    "to customize the bot to your server's needs.");
    const row = new ActionRowBuilder();
        row.addComponents(new ButtonBuilder()
        .setLabel("Client Panel")
        .setStyle(ButtonStyle.Link)
        .setURL("https://panel.disteam.com"));

    owner.send({embeds: [embed], rows: [row]});


    addGuild(guild.id);
}