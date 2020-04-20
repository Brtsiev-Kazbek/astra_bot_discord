const discord = require('discord.js');
const bot = new discord.Client();
const config = require('./config.json');
const fs = require('fs');
const path = './Store/usersData.json';
const userData = JSON.parse(fs.readFileSync(path));
const countMessages = require('./src/Counter.js').countMessages;
const bank = require('./src/Bank.js');

bot.on('ready', async () => {
    console.log(`${bot.user.username} has been started!`);
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: 'SELF DEVELOPING',
            type: 'PLAYING',
        },
    });
    const inviteLink = await bot.generateInvite();
    console.log(inviteLink);
});

bot.on('message', (msg) => {
    console.log(msg.content);
    if (msg.content.startsWith('!')) {
        countMessages(msg.author.username, userData, path);
        messageHandler(msg);
    }
});

bot.login(config.token);


/**
 *
 * @param {Message} msg
 *
 */
function messageHandler(msg) {
    const content = msg.content;
    if (content.includes('статистика')) {
        bank.showStat(msg, userData);
    } else if ( content.includes('банк')) {
        bank.showBank(msg, userData);
    }
}
