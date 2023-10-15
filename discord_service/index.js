const {Client, IntentsBitField, Collection, REST, Routes, ActivityType} = require('discord.js');
require('dotenv').config();
const fs = require('fs');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
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
        name: "port 8080",
        type: ActivityType.Listening
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
    });
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