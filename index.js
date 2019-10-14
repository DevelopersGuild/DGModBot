const Discord = require('discord.js');
const bot = new Discord.Client();
require('dotenv').config();

const PREFIX = 'DG!';

/**
 * Handles incoming messages for Robo
 */
const handleMessage = (msg) => {
    let args = msg.content.substring(PREFIX.length).split(" ");
    const {
        sendMessage
    } = msg.channel;
    switch (args[0]) {
        case 'website':
            sendMessage('da-developers.dev');
            break;
        case 'info':
            (args[1] === 'version') ? sendMessage('Version 1.0.1'): sendMessage('Invalid args')
            break;
    }
}

bot.on('ready', () => console.log('Robo is on.'))

bot.on('message', message => handleMessage(message));

bot.login(process.env.DISCORD_TOKEN);