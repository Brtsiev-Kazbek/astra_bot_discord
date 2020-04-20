/**
 * Shows a count of coins
 * @param {Message} msg
 * @param {JSON} userData
 */
function showBank(msg, userData) {
    msg.channel.send({embed: {
        title: 'Банк',
        color: '#f1c40f',
        fields: [{
            name: 'Владелец счета',
            value: msg.author.username,
            inline: true,
        },
        {
            name: 'Баланс',
            value: userData[msg.author.username].coins,
            inline: true,
        },
        ],

    }});
}

/**
 * show user's statistic
 * @param {Message} msg
 * @param {JSON} userData
 */
function showStat(msg, userData) {
    msg.reply(`у Вас ${userData[msg.author.username].coins} очков!`);
}

module.exports.showBank = showBank;
module.exports.showStat = showStat;
