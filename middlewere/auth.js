const { getUser } = require('../services/auth');

async function restrictToLoggedInUserOnly(req, res, next) {
    const token = req.cookies?.token;
    const requestedUrl = req.originalUrl; // Get the requested URL

    // Exclude the login page from redirection logic
    if ((requestedUrl === '/user/login') || (requestedUrl === '/user/signup')) {
        return next(); // Proceed to login page handler
    }

    if (!token) return res.redirect('/user/login');
    const user = getUser(token)?.user;
    if (!user) return res.redirect('/user/login');
    req.user = user;
    return next();
}

async function checkAuth(req, res, next) {
    const token = req.cookies?.token;
    const user = getUser(token)?.user;
    req.user = user;
    next();
}

async function checkProductInCart(req, res, next) {
    const product = req.cookies?.product;
    if (!product) return res.redirect('/');
    next();
}
async function checkAddressSelected(req, res, next) {
    const address = req.cookies?.address;
    const product = req.cookies?.product;
    if (!address && !product) return res.redirect('/address');
    next();
}

module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth,
    checkProductInCart,
    checkAddressSelected,
}