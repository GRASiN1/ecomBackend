const express = require('express');
const connectDB = require('./connection');
const User = require('./models/user');
const path = require('path');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user');
const staticRouter = require('./routes/staticsRoute');
const { restrictToLoggedInUserOnly } = require('./middlewere/auth');

const app = express();
const port = 3000;

connectDB('mongodb://localhost:27017/ecom');

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', restrictToLoggedInUserOnly, staticRouter);
app.use('/user', userRouter);


app.listen(port, () => {
    console.log(`Server running at : http://localhost:${port}`);
})