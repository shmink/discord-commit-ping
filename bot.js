var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var repo = require('./repos.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '-') { // If the first character of a string is '-' then it's a command
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // -v | -version = Version number of commiter bot
            case 'v':
            case 'version':
                bot.sendMessage({
                    to: channelID,
                    message: 'version 0.1'
                });
            break;
            // -n | -name = Name of repo added for commiter bot to work with
            case 'name':
            case 'n':
                bot.sendMessage({
                    to: channelID,
                    message: repo.name
                });
            break;
            // -l | -link = Link of the repo added
            case 'link':
            case 'l':
                bot.sendMessage({
                    to: channelID,
                    message: repo.link
                });
            break;
         }
     }
});