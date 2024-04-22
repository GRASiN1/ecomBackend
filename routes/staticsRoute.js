const express = require('express');
const Product = require('../models/products');
const { handleAddAddress } = require('../controller/address');
const Address = require('../models/address');
const { handleCartItem, handleAddressSelect } = require('../controller/order');
const { getAddress } = require('../services/address');
const { getProduct } = require('../services/product');
const { checkProductInCart, checkAddressSelected } = require('../middlewere/auth');

const router = express.Router();

router.get('/', async (req, res) => {
    const products = await Product.find({});
    res.render('home', { products: products });
});

router.get('/address', checkProductInCart, async (req, res) => {
    const addresses = await Address.find({ addressOwner: req.user._id });
    return res.render('address', { addresses: addresses });
});

router.get('/completion', checkAddressSelected, (req, res) => {
    const addressCookie = req.cookies?.address;
    const productCookie = req.cookies?.product;
    const address = getAddress(addressCookie);
    const product = getProduct(productCookie);
    res.clearCookie('address');
    res.clearCookie('product');
    return res.render('completion', { address: address, product: product });
})

router.post('/address', handleAddAddress);
router.post('/cart/:id', handleCartItem);
router.post('/select', handleAddressSelect);

module.exports = router;