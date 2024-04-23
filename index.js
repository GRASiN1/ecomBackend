//imports
const express = require('express');
const connectDB = require('./connection');
const User = require('./models/user');
const path = require('path');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user');
const staticRouter = require('./routes/staticsRoute');
const { restrictToLoggedInUserOnly } = require('./middlewere/auth');

//variable
const app = express();
const port = 3000;

//function calls
connectDB('mongodb://localhost:27017/ecom');

// setters
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

//middleweres
app.use(express.json()); // to read json data from body
app.use(express.urlencoded({ extended: false })); // to read form data from body
app.use(cookieParser());// to work with cookies
app.use(express.static(path.join(__dirname, 'public'))); // to server static file using nodejs
app.use('/', restrictToLoggedInUserOnly, staticRouter); // main router
app.use('/user', userRouter); // user creation route

//listen
app.listen(port, () => {
    console.log(`Server running at : http://localhost:${port}`);
})