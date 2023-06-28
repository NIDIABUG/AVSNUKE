require('dotenv').config();
const { Client, IntentsBitField, ActivityType } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => {
    console.log(`${c.user.tag} is Online`);

    client.user.setActivity({
        name: 'with ur mom'
    });
});

// FIX THIS, add ability to comparing no message and have
client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) { return; }

    if (interaction.commandName === 'hey') {
        interaction.reply('hello ' + interaction.user.username);
    }

    if (interaction.commandName === 'nuke') {
        const radius = interaction.options.get('radius').value;
        var last_message = interaction.options.get('last-message')?.value;

        // no message
        if (last_message === undefined) {
            last_message = 'with no messages';
        } else {
            last_message = 'saying \'' + last_message + '\'';
        }

        interaction.reply('mofo activated a nuke with a radius of ' + radius + ' ' + last_message);
        //interaction.reply('mofo activated a nuke with a radius of ' + radius + ' and it says \'' + last_message + '\'');
    }
})

client.on('messageCreate', (msg) => {
    if (msg.content === "eyo AVSNUKE add this 5 + 10") {
        msg.reply('its equal to 15 homie');
    }
});
client.login(process.env.TOKEN);