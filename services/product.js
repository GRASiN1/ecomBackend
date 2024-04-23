const jwt = require('jsonwebtoken');
const secretSalt = '@C1212ic1#GRASiN@Gr1stie#';

// this function encrypt product details to store in cookie
function setProduct(product) {
    return jwt.sign({ product }, secretSalt);
}

// this function extracts product details from token
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