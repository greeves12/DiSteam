const {fetchServerConfig} = require('../Http/Requests');
const {addGuild} = require('../API/Guilds');
const {EmbedBuilder} = require('discord.js');

module.exports = {botJoin};

async function botJoin(guild){
    var owner = await guild.fetchOwner().then(fetchServerConfig(guild.id, guild.ownerId));
    await guild.members.fetch();

    var embed = new EmbedBuilder()
    .setTitle("Thanks for the invite!")
    .setDescription("To get started, head over to your server and begin with /setup \n\nIf at anytime you are confused try the /help command.");

    owner.send({embeds: [embed]});

    addGuild(guild.id);
}