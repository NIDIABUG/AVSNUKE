require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

// Bot Commands
const commands = [
    {
        name: 'hey',
        description: 'Reply with hello',
    },
    {
        name: 'nuke',
        description: 'nuke em boi',
        options: [
            {
                name: 'radius',
                description: 'how big will be the blast radius of this thing',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'last-message',
                description: 'if there any, make it hilarious lmao',
                type: ApplicationCommandOptionType.String,
                required: false,
            },
        ],
    },
];

const rest = new REST({ version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try{
        console.log('Registering Commands..');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )

        console.log('Command Registered!');
    } catch(error){
        console.log(`error: ${error}`);
    }
})();