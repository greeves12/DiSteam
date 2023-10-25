const {getGuilds} = require('./Guilds');
const {fetchServerConfig, fetchVerifiedAccounts, deleteToken} = require('../Http/Requests');
const {EmbedBuilder} = require("discord.js");

module.exports = {autoPromote};

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


async function autoPromote(client){
    while(true){
        var guilds = getGuilds();
        var jsonMems = await fetchVerifiedAccounts();
        var accounts = [];

        for(let x = 0; x < jsonMems.length; x++){
            accounts.push(jsonMems[x].discord_iD);
        }

        await client.guilds.fetch();

        for (const element of guilds) {
            const guildMembers = await client.guilds.cache.get(element).members.fetch();
            const configJson = fetchServerConfig(element, client.guilds.cache.get(element).ownerId).then((configJson) => {
                const promoteRoles = configJson.verified_role;
                const removeRoles = configJson._join_role;

                if(promoteRoles.length !== 0){
                    return;
                }

                for(let x = 0; x < accounts.length; x++){
                    if(guildMembers.has(accounts[x])){
                        promoteRoles.forEach((roleId) => {
                            guildMembers.get(accounts[x]).roles.add(roleId);
                        });

                        removeRoles.forEach((roleId) => {
                            guildMembers.get(accounts[x]).roles.remove(roleId);
                        });

                        guildMembers.get(accounts[x]).send(buildMessage(client.guilds.cache.get(element).name, guildMembers.get(accounts[x]).user));
                    }
                }
            });
        }

        accounts.forEach((discordID) => {
            deleteToken(discordID);
        });

        accounts = [];

        await sleep(120000);
    }
}

function buildMessage(serverName, userName){
    const embed = new EmbedBuilder()
        .setTitle("You're verified!")
        .setDescription(`Congratulations ${userName}\n\nYour account meets the requirements for ${serverName}. You are now able to access areas that are reserved for verified members.\n\nRegards,\nThe DiSteam Team`);

    return {embeds: [embed], ephemeral: true};
}