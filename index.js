const Discord = require('discord.js');
const bot = new Discord.Client();
require('dotenv').config();


const RoboCommands = (msg) => ({
    "website": () => msg.reply('https://www.da-developers.dev'),
    "bot info": () => msg.reply('Version 1.0.1'),
    "hits vape": () => msg.reply('🥬💨'),
    "YEET": () => msg.reply('YOTE'),
    "ping": () => msg.reply('🏓pong')
});

const TonyCommands = (msg) => ({
    "lead": () => msg.reply('👌 You are a Leadership Member')
});

/**
 * Handles incoming messages for Robo
 */
const handleMessage = (msg) => {
    const PREFIX = 'DG!';
    const TonyKey = 'Tony=>'
    const msgs = msg.content.split(" ")
    const roboCommands = RoboCommands(msg);
    let role = msg.member.guild.roles.find('name', 'Leadership')
    if (msgs[0] == PREFIX) {
        // getting rid of DG! prefix
        msgs.splice(0, 1);
        if (msgs[0] == TonyKey) {
            if (msgs.length === 0 || msgs == undefined) {
                msg.reply('At least one argument is needed to complete a task.');
            } else {
                if (TonyCommands[msgs.join(" ")]) {
                    TonyCommands[msgs.join(" ")]();
                } else {
                    msg.reply('The command you entered is could not be found.')
                }
            }
        }
        if (msgs.length === 0 || msgs == undefined) {
            msg.reply('At least one argument is needed to complete a task.');
        } else {
            if (roboCommands[msgs.join(" ")]) {
                roboCommands[msgs.join(" ")]();
            } else {
                msg.reply('The command you entered is could not be found.')
            }
        }
    }

}

bot.on('ready', () => console.log('Robo is on.'));

bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'welcome');
    if (!channel) return;
    // Set new members to 'Unapproved' role
    let role = member.guild.roles.find('name', 'Unapproved');
    member.addRole(role);
    channel.send(`Welcome to the server, ${member} be sure to read #rules 👋`);
});

bot.on('message', message => {
    if (message.channel.name == 'rules') {
        let role = message.member.guild.roles.find('name', 'Unapproved');
        message.member.removeRole(role);
        message.delete(0)
            .then(msg => console.log(`Deleted message from ${msg.author.username}`))
            .catch(console.error);
    }
});

bot.on('message', message => handleMessage(message));

bot.login(process.env.DISCORD_TOKEN);