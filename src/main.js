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
client.on('interactionCreate', async (interaction) => {
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
    else if (interaction.commandName === 'calculate') {
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
    //const { commandName } = interaction;
    // FIX THIS LATER, IMPORT THE DELETE FUNCTION IN HERE NOT WITH THE MESSAGE CREATE
    if (interaction.commandName === 'delete') {
        const deleteRange = interaction.options.get('range').value;

        try {
            const fetchedMessages = await interaction.channel.messages.fetch({ limit: deleteRange });
            interaction.channel.bulkDelete(fetchedMessages)
                .then((deletedMessages) => {
                    const deleteCount = deletedMessages.size;
                    console.log(`Deleted ${deleteCount} messages`);
                    interaction.reply(`Deleted ${deleteCount} messages.`);
                })
                .catch((err) => {
                    console.error('Error deleting messages:', err);
                    interaction.reply('An error occurred while deleting messages.');
                });
        } catch (error) {
            console.error('Error fetching messages:', error);
            interaction.reply('An error occurred while fetching messages.');
        }
    }
});

// Mics stuff for testing
client.on('messageCreate', async (message) => {
    if (message.content === "eyo AVSNUKE add this 5 + 10") {
        message.reply('its equal to 15 homie');
    }
});

// Clients Token
client.login(process.env.TOKEN);