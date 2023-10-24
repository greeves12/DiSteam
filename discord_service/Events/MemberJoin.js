const {fetchServerConfig, fetchAuthToken, createFetchPlayer} = require('../Http/Requests');
const {buildAuthMessage} = require('../Utilities/MessageBuilder');
const {EmbedBuilder} = require('discord.js');


module.exports = {onJoin};

async function onJoin(member){
    var json = createFetchPlayer(member.id);
    var config = fetchServerConfig(member.guild.id, member.guild.ownerId);
    var requiredTime = config.epochTime;
    var accountAge = json.ageOfAccount;

    
    if(JSON.stringify(json) !== "{}"){
        if(accountAge < requiredTime){

            embed = new EmbedBuilder()
            .setTitle("Verification Update")
            .setDescription(`Hi, ${member.user}\n\nUnfortunately your account does not meet the requirements to be verified for this server. When your account meets the restrictions set by the server, you will automatically be verified.\n\nRegards,\n\nThe DiSteam Team`)

            member.send({embeds: [embed]});
        }
    }

    var authToken = fetchAuthToken(member.id);

    
    member.send(buildAuthMessage(authToken, requiredTime, member.user));
}