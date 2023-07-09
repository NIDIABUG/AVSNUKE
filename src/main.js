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
        let last_message = interaction.options.getString('last-message');

        last_message == undefined ? last_message = 'with no messages' : last_message = 'saying \'' + last_message + '\'';
        interaction.reply(interaction.user.username + ' activated a nuke with a radius of ' + radius + ' ' + last_message);
    }
    else if (interaction.commandName === 'calculate') {
        // Thinking about using the getNumber() function, but it concatenates the number using the '+' operator like a string lmao
        const numberOne = interaction.options.get('number-one').value;
        const numberTwo = interaction.options.get('number-two').value;
        const operator = interaction.options.getString('operator');
        // I ternaryfied the sum to
        let sum = (() => {
            if (operator === '+') return numberOne + numberTwo;
            else if (operator === '-') return numberOne - numberTwo;
            else if (operator === '*') return numberOne * numberTwo;
            else if (operator === '/') return numberOne / numberTwo;
        })();
        if (!sum) return interaction.reply('wrong command, use (+, -, *, /) for the operator');
        interaction.reply(numberOne + ' ' + operator + ' ' + numberTwo + ' = ' + sum);
    }
    else if (interaction.commandName === 'delete') {
        const deleteRange = interaction.options.get('range').value;
        let isVisible = interaction.options.getBoolean('visible') ?? true;
        try {
            const fetchedMessages = await interaction.channel.messages.fetch({ limit: deleteRange });
            interaction.channel.bulkDelete(fetchedMessages)
                .then((deletedMessages) => {
                    const deleteCount = deletedMessages.size;
                    console.log(interaction.user.username + ` Deleted ${deleteCount} messages`);
                    if (isVisible != false){
                        interaction.reply(interaction.user.username + ` Deleted ${deleteCount} messages.`);
                    }
                        
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