const jwt = require('jsonwebtoken');
const secretSalt = '@C1212ic1#GRASiN@Gr1stie#';

//this function encrypts user details into a token to be stored
function setUser(user) {
    return jwt.sign({ user }, secretSalt);
}

// this function extracts the user form the token
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