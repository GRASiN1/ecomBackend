const { getUser } = require('../services/auth');

// function that check if the user is logged in or not if not then redirect to log in page
async function restrictToLoggedInUserOnly(req, res, next) {
    const token = req.cookies?.token;
    const requestedUrl = req.originalUrl;

    // Exclude the login or signup page from redirection logic
    if ((requestedUrl === '/user/login') || (requestedUrl === '/user/signup')) {
        return next(); // Proceed to login or signup page handler
    }

    if (!token) return res.redirect('/user/login');
    const user = getUser(token)?.user;
    if (!user) return res.redirect('/user/login');
    req.user = user;
    return next();
}

// function checks if user have added any product in cart before letting them access address route
async function checkProductInCart(req, res, next) {
    const product = req.cookies?.product;
    if (!product) return res.redirect('/');
    next();
}

//function check if user have selected address and product before giving confirmation of placed order
async function checkAddressSelected(req, res, next) {
    const address = req.cookies?.address;
    const product = req.cookies?.product;
    if (!address && !product) return res.redirect('/address');
    next();
}

module.exports = {
    restrictToLoggedInUserOnly,
    checkProductInCart,
    checkAddressSelected,
}