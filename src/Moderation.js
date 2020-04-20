
/**
 * Ban a user
 * @param {Message} msg
 */
async function ban(msg) {
    const separetedContent = msg.content.split(' ');
    const reason = separetedContent[2];

    if (!msg.guild.member(msg.author).hasPermission('BAN_MEMBERS')) {
        msg.reply(`У вас недостаточно прав!`);
        return;
    } else {
        let member = msg.mentions.members.first();
        try {
            member = await member.ban({
                reason,
            });
        } catch (error) {
            console.log(error.message);
            msg.reply('Ошибка.');
            return;
        }
        msg.reply(`${member.displayName}был забанен. Причина: ${reason}`);
    }
}

/**
 * Kick a user from chat
 * @param {Message} msg
 */
async function kick(msg) {
    const separetedContent = msg.content.split(' ');
    const reason = separetedContent[2];

    if (!msg.member.hasPermission(['KICK_MEMBERS', 'ADMINISTRATOR'])) {
        msg.reply('У вас недостаточно прав!');
    } else {
        let member = msg.mentions.members.first();
        try {
            member = await member.kick(reason);
        } catch (error) {
            console.log(error.message);
            msg.reply('Ошибка.');
            return;
        }
        msg.reply(`${member.displayName} кикнут. Причина: ${reason}`);
    }
}

module.exports.ban = ban;
module.exports.kick = kick;
