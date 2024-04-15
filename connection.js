const mongoose = require('mongoose');

function connectDB(URL) {
    mongoose.connect(URL)
        .then(() => {
            console.log('MongoDB connected');
        })
}

module.exports = connectDB;