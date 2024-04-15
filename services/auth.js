const jwt = require('jsonwebtoken');
const secretSalt = '@C1212ic1#GRASiN@Gr1stie#';

function setUser(user) {
    return jwt.sign({ user }, secretSalt);
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secretSalt);
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    setUser,
    getUser,
}