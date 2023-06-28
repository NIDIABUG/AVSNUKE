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
    {
        name: 'add',
        description: 'add two numbers',
        options: [
            {
                name: 'number-one',
                description: 'the first number your trying to add obviously',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'number-two',
                description: 'the second number your trying to add bro',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'operator',
                description: '+, -, *, /, its arithmetic, just so you know',
                type: ApplicationCommandOptionType.String,
                required: true,
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