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

module.exports = router;