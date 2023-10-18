const {Client, IntentsBitField, Collection, REST, Routes, ActivityType, EmbedBuilder} = require('discord.js');
require('dotenv').config();
const fetch = require('node-fetch');
const fs = require('fs');

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
let guildConfigs = new Map();

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
        name: "Connected to the mainframe",
        type: ActivityType.Custom
    });


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
    var owner = await guild.fetchOwner();
    await guild.members.fetch();

    var embed = new EmbedBuilder()
    .setTitle("Thanks for the invite!")
    .setDescription("To get started, head over to your server and begin with /setup \n\nIf at anytime you are confused try the /help command.");

    owner.send({embeds: [embed]});

    guilds.push(guild.id);

    fetch('https://steam-auth-bot-production.up.railway.app/config/get', {
        method: 'POST',
        body: JSON.stringify({
            server_id: parseInt(guild.id, 10)
        }),
        headers: { 
            'Content-type': 'application/json; charset=UTF-8',
             api_key: process.env.API_KEY,  
        }, 
    })
    .then((response) => response.json())
    .then((json) => {
        guildConfigs.set(guild.id, json);
    });
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

client.login(process.env.TOKEN);

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function scraper(guildId){
    while(guilds.includes(guildId)){
        console.log(guildId);
        sleep(5000);
    }
}