module.exports = {addGuild, removeGuild, getGuilds};

let guilds = [];

 function addGuild(guildId){
    guilds.push(guildId);
}

 function removeGuild(guildId){
    for(let i = 0; i < guilds.length; i++){
        if(guilds[i] === guildId){
            guilds.splice(i, 1);
        }
    }
}

 function getGuilds(){
    return guilds;
}