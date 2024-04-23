const express = require('express');
const { handleCreateUser, handleLoginUser } = require('../controller/user');

const router = express.Router();

// router for sign up page
router.get('/signup', (req, res) => {
    res.render('signup');
})
//router for log in page
router.get('/login', (req, res) => {
    res.render('login');
})
// router that handle new user registration
router.post('/signup', handleCreateUser);
// router that handle user login
router.post('/login', handleLoginUser);

// router that logs out the user
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.redirect('/');
});

module.exports = router;