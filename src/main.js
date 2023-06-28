require('dotenv').config();
const { Client, IntentsBitField, ActivityType, SnowflakeUtil } = require('discord.js');

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

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) { return; }
    else if (interaction.commandName === 'hey') {
        interaction.reply('hello ' + interaction.user.username);
    }
    else if (interaction.commandName === 'nuke') {
        const radius = interaction.options.get('radius').value;
        var last_message = interaction.options.get('last-message')?.value;

        // no message
        if (last_message === undefined) {
            last_message = 'with no messages';
        } else {
            last_message = 'saying \'' + last_message + '\'';
        }

        interaction.reply(interaction.user.username + ' activated a nuke with a radius of ' + radius + ' ' + last_message);
    }
    else if (interaction.commandName == 'calculate') {
        const numberOne = interaction.options.get('number-one').value;
        const numberTwo = interaction.options.get('number-two').value;
        const operator = interaction.options.get('operator').value;
        let sum;
        if (operator !== '+' && operator !== '-' && operator !== '*' && operator !== '/') {
            interaction.reply(interaction.user.username + 'wrong command, use (+, -, *, /) for the operator');
            return;
        } else {
            switch (operator) {
                case '+':
                    sum = numberOne + numberTwo;
                    break;
                case '-':
                    sum = numberOne - numberTwo;
                    break;
                case '*':
                    sum = numberOne * numberTwo;
                    break;
                case '/':
                    sum = numberOne / numberTwo;
                    break;
                default:
                    break;
            }
        }
        interaction.reply(interaction.user.username + ' ' + numberOne + ' ' + operator + ' ' + numberTwo + ' is equal to ' + sum);
    }
});

client.on('messageCreate', (msg) => {
    if (msg.content === "eyo AVSNUKE add this 5 + 10") {
        msg.reply('its equal to 15 homie');
    }
});
client.login(process.env.TOKEN);