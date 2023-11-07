const {fetchServerConfig} = require('../Http/Requests');
const {addGuild} = require('../API/Guilds');
const {EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');

module.exports = {botJoin};

async function botJoin(guild){
    const owner = await guild.fetchOwner().then(fetchServerConfig(guild.id, guild.ownerId));
    await guild.members.fetch();

    const embed = new EmbedBuilder()
        .setTitle("Thank you for inviting me to your server.")
        .setDescription("If this is your first time using our service, you will have to configure a few options. You can do so by clicking the button below and logging" +
            "in through your Discord account.");
    const row = new ActionRowBuilder();
        row.addComponents(new ButtonBuilder()
        .setLabel("Client Panel")
        .setStyle(ButtonStyle.Link)
        .setURL("https://panel.disteam.com"));

    owner.send({embeds: [embed], components: [row]});


    addGuild(guild.id);
}