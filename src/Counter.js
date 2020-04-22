const FsManager = require('./FsManager');
const userData = require('./FsManager').userData;

/**
 * Counts messages and write res into JSON file
 * @param {String} author
 */
function countMessages(author) {
    if (!userData[author]) {
        userData[author] = {coins: 0};
    }
    userData[author].coins++;
    FsManager.saveUserData(userData);
}

module.exports.countMessages = countMessages;
