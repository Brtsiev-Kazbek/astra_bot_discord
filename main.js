const discord = require('discord.js');
const bot = new discord.Client();
const config = require('./config.json');
const countMessages = require('./src/Counter.js').countMessages;
const bank = require('./src/Bank.js');
const moderation = require('./src/Moderation.js');
const covid = require('./src/Covid.js');
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
        global.msg = msg;
        countMessages(msg.author.username);
        handlers(msg);
    }
});

bot.login(config.token);


/**
 * catch messages and call handlers
 * @param {Message} msg
 *
 */
function handlers(msg) {
    const command = msg.content.split(' ')[0];
    const action = {
        '!банк': bank.showBank,
        '!статистика': bank.showStat,
        '!бан': moderation.ban,
        '!кик': moderation.kick,
        '!covid': covid.getInfoAboutCOVID,
    };
    action[command](msg);
}
