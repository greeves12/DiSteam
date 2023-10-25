module.exports = {addGuild, removeGuild, getGuilds};

let guilds = [];

async function addGuild(guildId){
    guilds.push(guildId);
}

async function removeGuild(guildId){
    for(let i = 0; i < guilds.length; i++){
        if(guilds[i] === guildId){
            guilds.splice(i, 1);
        }
    }
}

async function getGuilds(){
    return guilds;
}