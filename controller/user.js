const User = require('../models/user');
const { setUser } = require('../services/auth');

// function that registers new user in database
async function handleCreateUser(req, res) {
    const { email, password } = req.body;
    await User.create({
        email,
        password,
    })
    return res.redirect('/user/login');
}

// function that checks for valid user details and let them log in
async function handleLoginUser(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.json({ error: 'User not found' });
    if (!(user.password === password)) return res.json({ error: 'Wrong password' });
    const token = setUser(user);
    res.cookie('token', token);
    return res.redirect('/');
}

module.exports = {
    handleCreateUser,
    handleLoginUser,
}