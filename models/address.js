const mongoose = require('mongoose');

// address schema
const addressSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    fullAddress: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    addressOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }
}, { timestamps: true });

const Address = mongoose.model('address', addressSchema);

module.exports = Address;