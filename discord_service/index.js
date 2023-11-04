const {Client, IntentsBitField, Collection, REST, Routes, ActivityType, EmbedBuilder} = require('discord.js');
require('dotenv').config();
const fetch = require('node-fetch');
const fs = require('fs');
const {autoPromote} = require('./API/WebScraper');

const {onJoin} = require('./Events/MemberJoin');
const {botJoin} = require('./Events/BotJoin');
const {onBotLeave} = require('./Events/BotLeave');

const {addGuild, getGuilds} = require('./API/Guilds');


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
    client.guilds.cache.forEach((g) => addGuild(g.id));
    
    
    autoPromote(client);

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
    await botJoin(guild);
});

client.on("guildDelete", async (guild) => {
    await onBotLeave(guild);
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
    await onJoin(member);
});


client.login(process.env.TOKEN);

