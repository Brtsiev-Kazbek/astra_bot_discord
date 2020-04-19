const discord = require('discord.js')
const bot = new discord.Client();
const config = require('./config.json');
const fs = require('fs');
const path = './Store/usersData.json'
const userData = JSON.parse(fs.readFileSync(path));

let botName;


bot.on('ready', () => {
    console.log(`${bot.user.username} has been started!`)
    botName = bot.user.username;
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: 'SELF DEVELOPING',
            type: 'PLAYING'
        }
    })
    bot.generateInvite().then((res) => {
        console.log(res)
    })
})

bot.on('message', (msg) => {
        if(msg.author.username !== botName) {
            countMessages(msg)
            if(msg.content.startsWith('Astra, ')) {
                messageHandler(msg)
            }
        }
})

bot.login(config.token)

function messageHandler(msg) {
    msg.content = msg.content.replace('Astra, ', '');
    console.log(msg.content)
    // msg.reply(`чего надо ${msg.author.username}?`);
    // msg.channel.send(`${msg.content}`);
    commands(msg);
}

function commands(msg) {
    let author = msg.author.username;
    let content = msg.content;
    if(content.includes('статистика')) {
        msg.reply(`у Вас ${userData[author].coins} очков!`)
    } 
    else if( content.includes('банк')) {
        msg.channel.send({embed: {
            title: 'Банк',
            color: 0xf1c40f,
            fields: [{
                name: 'Владелец счета',
                value: author,
                inline: true
            },
            {
                name: 'Баланс',
                value: userData[author].coins,
                inline: true
            }
        ],
            
        }});
    }
}

function countMessages(msg) {
    let author = msg.author.username;
    if(!userData[author]) {
        userData[author] = { coins : 0} 
    }
    userData[author].coins++;
    fs.writeFileSync(path, JSON.stringify(userData));
}
