const jwt = require('jsonwebtoken');
const secretSalt = '@C1212ic1#GRASiN@Gr1stie#';

// this function creates a token for the selected address
function setAddress(address) {
    return jwt.sign({ address }, secretSalt);
}

// this function return the selected address by extracting it from the token
function getAddress(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secretSalt);
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    setAddress,
    getAddress,
}