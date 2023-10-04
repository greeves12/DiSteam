const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("link")
    .setDescription("Link you Steam with Discord"),
    async execute (interaction){
        interaction.reply("pong");
    }

};