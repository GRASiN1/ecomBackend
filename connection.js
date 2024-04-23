const mongoose = require('mongoose');
// function that connects to mongodb
function connectDB(URL) {
    mongoose.connect(URL)
        .then(() => {
            console.log('MongoDB connected');
        })
}

module.exports = connectDB;