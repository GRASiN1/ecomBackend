const express = require('express');
const { handleCreateUser, handleLoginUser } = require('../controller/user');

const router = express.Router();

router.get('/signup', (req, res) => {
    res.render('signup');
})
router.get('/login', (req, res) => {
    res.render('login');
})
router.post('/signup', handleCreateUser);
router.post('/login', handleLoginUser);
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.redirect('/');
});

module.exports = router;