const {ActionRowBuilder, ButtonBuilder, EmbedBuilder} = require('discord.js');

module.exports = {buildAuthMessage};

function buildAuthMessage(token, requiredTime, memberName){
    var currentDate = new Date().valueOf();
    var res = Math.abs(requiredTime);
    var difference = Math.floor(res / 86400);
    

    embed = new EmbedBuilder()
        .setTitle("Verification Alert")
        .setDescription(`Hello ${memberName}\n\nThis server is connected to the DiSteam Network. The server owner has outlined a few requirements to have full access to the server:
        \n-You must authenticate your Steam Account\n-Your Steam account must be ${difference} days old.\n\nRegards,\nThe DiSteam Team`);

        const row = new ActionRowBuilder();
        row.addComponents(new ButtonBuilder()
        .setLabel("Authenticate Me")
        .setStyle(ButtonStyle.Link)
        .setURL(`https://steamlink.vercel.app/index.html?token=${token}`)
    );

    return({embeds: [embed], components: [row], ephemeral: true});
}