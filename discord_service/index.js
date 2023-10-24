const {Client, IntentsBitField, Collection, REST, Routes, ActivityType, EmbedBuilder} = require('discord.js');
require('dotenv').config();
const fetch = require('node-fetch');
const fs = require('fs');

const {onJoin} = require('./Events/MemberJoin');
const {botJoin} = require('./Events/BotJoin');
const {onBotLeave} = require('./Events/BotLeave');


const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.DirectMessages
    ],
});


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
    botJoin(guild);
});

client.on("guildDelete", async (guild) => {
    onBotLeave(guild);
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
    onJoin(member);
});


client.login(process.env.TOKEN);

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function scraper(guildId){
    while(guilds.includes(guildId)){
        
        await sleep(50000);
    }
}

