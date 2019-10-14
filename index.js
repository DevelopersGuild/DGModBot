const Discord = require('discord.js');
const bot = new Discord.Client();

const token = 'GET THE TOKEN!';

const PREFIX = 'DG!';
bot.on('ready', () => {
    console.log('DGMODBOT ONLINE');
})

bot.on('message', message=>{
    let args = message.content.substring(PREFIX.length).split(" ");
    
    switch(args[0]){
        case 'ping':
            message.reply('pong');
            break;
        case 'website':
            message.channel.sendMessage('da-developers.dev');
            break;
        case 'info':
            if (args[1]=== 'version'){
                message.channel.sendMessage('Version 1.0.1');
            }else{
                message.channel.sendMessage('Invalid args')
            }
            break; 
    }


})
bot.login(token);
