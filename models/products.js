const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        unique: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productImageURL: {
        type: String,
        default: '/images/productImageDefault.webp',
    },
    quantity: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

const Product = mongoose.model('product', productSchema);

module.exports = Product;