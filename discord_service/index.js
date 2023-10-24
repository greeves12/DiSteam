const {Client, IntentsBitField, Collection, REST, Routes, ActivityType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
require('dotenv').config();
const fetch = require('node-fetch');
const fs = require('fs');


module.exports = {buildAuthMessage, fetchServerConfig};

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.DirectMessages
    ],
});

let guilds = [];

const commandFiles = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"));
client.commands = new Collection();
const commands = [];

for (const file of commandFiles){
    const command = require(`./Commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}

const rest = new REST().setToken(process.env.TOKEN);


client.once("ready", () => {
    client.user.setActivity({
        name: "Monitoring Members",
        type: ActivityType.Custom
    });

    client.guilds.fetch();
    guilds = client.guilds.cache.map(g => g.id);
    client.guilds.cache.forEach(g => scraper(g.id));

    (async () => {
        try {
            await rest.put(
                Routes.applicationCommands(process.env.CLIENT_ID),
                {body: commands}
            )   
        } catch (error) {
            console.log(error)
        }
    })();
});

client.on("guildCreate", async (guild) => {
    var owner = await guild.fetchOwner().then(fetchServerConfig(guild.id, guild.ownerId));
    await guild.members.fetch();

    var embed = new EmbedBuilder()
    .setTitle("Thanks for the invite!")
    .setDescription("To get started, head over to your server and begin with /setup \n\nIf at anytime you are confused try the /help command.");

    owner.send({embeds: [embed]});

    guilds.push(guild.id);


});

client.on("guildDelete", async (guild) => {
    var owner = await guild.fetchOwner();
    var embed = new EmbedBuilder()
    .setTitle("Sorry to see you go!")
    .setDescription("Before you go, your server's config will be saved for up to one year incase you plan on returning in the future.\n\nWe hope to see you again.");

    owner.send({embeds: [embed]});
});

client.on("interactionCreate", async interaction => {
    if(!interaction.isCommand()){
        return;
    }

    const command = client.commands.get(interaction.commandName);
    if(!command){
        return;
    }

    try {
        await command.execute(interaction);
    }catch (err){
        console.log(err);
    }
});

client.on("guildMemberAdd", async (member) => {
    var json = createFetchPlayer(member.id);
    var config = fetchServerConfig(member.guild.id, member.guild.ownerId);
    var requiredTime = config.epochTime;
    var accountAge = json.ageOfAccount;

    
    if(JSON.stringify(json) !== "{}"){
        if(accountAge < requiredTime){
            //Account is less than server required account age
        }
    }

    var authToken = fetchAuthToken(member.id);

    
    member.send(buildAuthMessage(authToken, requiredTime, member.user));
});

function fetchAuthToken(discordId){
    return new Promise((resolve) => {
            fetch(process.env.TOKEN_LINK, { 
                method: 'POST', 
                body: JSON.stringify({ 
                    discord_id: parseInt(discordId,10)
            }), 
            headers: { 
                'Content-type': 'application/json; charset=UTF-8',
                'api_key': process.env.API_KEY,  
            }, 
        }) 
        .then((response) => response.json()) 
        .then((json) => {
            resolve(json);
        });
    });
}

function createFetchPlayer(discordID){
    return new Promise((resolve) => {
        fetch(process.env.MEMBER_LINK, {
            method: "POST",
            body: JSON.stringify({
                discord_id: parseInt(member.id, 10)
            }),
            headers: {
                'api_key': process.env.API_KEY,
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })
        .then((response) => response.json())
        .then((json) => {
            resolve(json);
        });

    });
}

function fetchServerConfig(serverId, ownerId){
    return new Promise((resolve) => {
        fetch(process.env.CONFIG_LINK, {
            method: 'POST',
            body: JSON.stringify({
                server_id: parseInt(serverId, 10),
                owner_id: parseInt(ownerId, 10)
            }),
            headers: { 
                'Content-type': 'application/json; charset=UTF-8',
                'api_key': process.env.API_KEY,  
            }, 
        })
        .then((response) => response.json())
        .then((json) => {
            resolve(json);
        });
    });
}

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

client.login(process.env.TOKEN);

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function scraper(guildId){
    while(guilds.includes(guildId)){
        
        await sleep(50000);
    }
}

