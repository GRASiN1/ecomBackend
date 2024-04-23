const mongoose = require('mongoose');

// user schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    ordersPlaced: [{ order: { type: mongoose.Schema.Types.ObjectId, ref: 'order' } }],
    role: {
        type: String,
        default: 'normal',
    }
}, { timestamps: true });

const User = mongoose.model('user', userSchema);

module.exports = User;