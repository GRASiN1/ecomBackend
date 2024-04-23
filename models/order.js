const mongoose = require('mongoose');

//order schema
const orderSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    deliveryAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address',
    }
})

const Order = mongoose.model('order', orderSchema);

module.exports = Order;