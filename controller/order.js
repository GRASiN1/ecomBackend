const { setProduct } = require('../services/product');
const { setAddress } = require('../services/address');
const Product = require('../models/products');

// function that add selected item to cart
async function handleCartItem(req, res) {
    const productId = req.params.id;
    const selectedProduct = await Product.findOne({ _id: productId });
    const productCookie = setProduct(selectedProduct);
    res.cookie('product', productCookie);
    return res.redirect('/address');
}

// functiono that selects the address to delivery product on
async function handleAddressSelect(req, res) {
    const selectedAddress = JSON.parse(req.body.selectedAddress);
    const addressCookie = setAddress(selectedAddress);
    res.cookie('address', addressCookie);
    return res.redirect('/completion');
}

module.exports = {
    handleCartItem,
    handleAddressSelect
}