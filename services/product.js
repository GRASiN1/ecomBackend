const jwt = require('jsonwebtoken');
const secretSalt = '@C1212ic1#GRASiN@Gr1stie#';

function setProduct(product) {
    return jwt.sign({ product }, secretSalt);
}

function getProduct(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secretSalt);
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    setProduct,
    getProduct,
}