const fs = require('fs');
/**
 * Counts messages and write res into JSON file
 * @param {String} author
 * @param {JSON} userData
 * @param {String} path
 */
function countMessages(author, userData, path) {
    if (!userData[author]) {
        userData[author] = {coins: 0};
    }
    userData[author].coins++;
    fs.writeFileSync(path, JSON.stringify(userData));
}

module.exports.countMessages = countMessages;
