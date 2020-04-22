
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
            msg.reply('ошибка.');
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
    const reason = separetedContent[2] || 'Таков путь...';

    if (!msg.member.hasPermission(['KICK_MEMBERS', 'ADMINISTRATOR'])) {
        msg.reply('У вас недостаточно прав!');
    } else {
        let member = msg.mentions.members.first();
        try {
            member = await member.kick(reason);
        } catch (error) {
            console.log(error.message);
            msg.reply('ошибка.');
            return;
        }
        msg.reply(`${member.displayName} кикнут. Причина: ${reason}`);
    }
}

/**
 * Sets role to a user
 * @param {Message} msg
 */
async function setRole(msg) {
    if (!msg.member.hasPermission('MAGANE_MEMBERS')) {
        msg.reply('недостаточно прав');
        return;
    } else {
        const content = msg.content;
        const member = msg.guild.member(msg.mentions.users.first());
        console.log(member);
        role = content.substring(content.lastIndexOf('[') + 1);
        role = role.slice(0, role.lastIndexOf(']'));
        const gRole = msg.guild.roles.cache.find((fRole) => fRole.name == role);
        if (!gRole || member.roles.cache.has(gRole.id)) {
            msg.reply('невозможно добавить роль');
            return;
        }
        try {
            await member.roles.add(gRole.id);
            msg.channel.send(`${member} была выдана роль ${gRole.name}`);
        } catch (error) {
            msg.reply('ошибка!');
            console.log(error.message);
            return;
        }
    }
}

/**
 * Remove role from user
 * @param {Message} msg
 */
async function removeRole(msg) {
    if (!msg.member.hasPermission('MAGANE_MEMBERS')) {
        msg.reply('недостаточно прав');
        return;
    } else {
        const content = msg.content;
        const member = msg.guild.member(msg.mentions.users.first());
        console.log(member);
        role = content.substring(content.lastIndexOf('[') + 1);
        role = role.slice(0, role.lastIndexOf(']'));
        const gRole = msg.guild.roles.cache.find((fRole) => fRole.name == role);
        if (!gRole || !member.roles.cache.has(gRole.id)) {
            msg.reply('невозможно снять роль');
            return;
        }
        try {
            await member.roles.remove(gRole.id);
            msg.channel.send(`${member} была снята роль ${gRole.name}`);
        } catch (error) {
            msg.reply('ошибка!');
            console.log(error.message);
            return;
        }
    }
}

/**
 * Set role by id
 * @param {Message} msg
 * @param {UserID} id
 * @param {String} role
 */
async function setRoleById(msg, id, role) {
    const user = msg.guild.members.cache.find((user) => user.id == id);
    const gRole = msg.guild.roles.cache.find((fRole) => fRole.name == role);
    if (!gRole || user.roles.cache.has(gRole.id)) {
        console.log('невозможно добавить роль');
        return;
    }
    try {
        await user.roles.add(gRole.id);
        console.log(`${user} была выдана роль ${gRole.name}`);
    } catch (error) {
        console.log(error.message);
        return;
    }
}

/**
 * Remove role by id
 * @param {Message} msg
 * @param {UserID} id
 * @param {String} role
 */
async function removeRoleById(msg, id, role) {
    const user = msg.guild.members.cache.find((user) => user.id == id);
    const gRole = msg.guild.roles.cache.find((fRole) => fRole.name == role);
    if (!gRole || !user.roles.cache.has(gRole.id)) {
        console.log('невозможно добавить роль');
        return;
    }
    try {
        await user.roles.remove(gRole.id);
        console.log(`У ${user} была удалена роль ${gRole.name}`);
    } catch (error) {
        console.log(error.message);
        return;
    }
}

module.exports.ban = ban;
module.exports.kick = kick;
module.exports.setRole = setRole;
module.exports.removeRole = removeRole;
module.exports.setRoleById = setRoleById;
module.exports.removeRoleById = removeRoleById;
