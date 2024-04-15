const { setProduct } = require('../services/product');
const { setAddress } = require('../services/address');

async function handleCartItem(req, res) {
    const selectedProduct = JSON.parse(req.body.selectedProduct);
    const productCookie = setProduct(selectedProduct);
    res.cookie('product', productCookie);
    return res.redirect('/address');
}

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