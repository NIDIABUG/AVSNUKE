// Import stuffs
require('dotenv').config();
const { Client, IntentsBitField, ActivityType, SnowflakeUtil } = require('discord.js');

// Make a Bot instance with this attibutes
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

// Log when the client (Bot) is connected
client.on('ready', (c) => {
    console.log(`${c.user.tag} is Online`);

    client.user.setActivity({
        name: 'with ur mom'
    });
});

// All of the command handlers
client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) { return; }

    else if (interaction.commandName === 'hey') {
        interaction.reply('hello ' + interaction.user.username);
    }
    else if (interaction.commandName === 'nuke') {
        const radius = interaction.options.get('radius').value;
        var last_message = interaction.options.getString('last-message');

        last_message == undefined ? last_message = 'with no messages' : last_message = 'saying \'' + last_message + '\'';
        interaction.reply(interaction.user.username + ' activated a nuke with a radius of ' + radius + ' ' + last_message);
    }
    else if (interaction.commandName == 'calculate') {
        // Thinking about using the getNumber() function, but It concatenates the number using the '+' operator like a string lmao
        const numberOne = interaction.options.get('number-one').value;
        const numberTwo = interaction.options.get('number-two').value;
        const operator = interaction.options.getString('operator');
        let sum = (() => {
            if (operator === '+') return numberOne + numberTwo;
            else if (operator === '-') return numberOne - numberTwo;
            else if (operator === '*') return numberOne * numberTwo;
            else if (operator === '/') return numberOne / numberTwo;
        })();
        if (!sum) return interaction.reply(interaction.user.username + ' wrong command, use (+, -, *, /) for the operator');
        interaction.reply(interaction.user.username + ' ' + numberOne + ' ' + operator + ' ' + numberTwo + ' is equal to ' + sum);
    }
});

// Mics stuff for testing
client.on('messageCreate', async (message) => {
    if (message.content === "eyo AVSNUKE add this 5 + 10") {
        message.reply('its equal to 15 homie');
    }
    else if (message.content === '!delete') {
        try{
            const fethchMessage = await message.channel.messages.fetch({limit: 10});
            message.channel.bulkDelete(fethchMessage)
            .then((deletedMessages) => {
                const deleteCount = deletedMessages.size;
                console.log('Deleted ${deleteCount} messages');
            })
            .catch((err) => console.error('error deleting messages', err));
        }catch (e) {
            console.error('Error fetching messages:', e);
        }
    }
});

// Clients Token
client.login(process.env.TOKEN);