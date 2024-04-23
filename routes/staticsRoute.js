const express = require('express');
const Product = require('../models/products');
const { handleAddAddress } = require('../controller/address');
const Address = require('../models/address');
const { handleCartItem, handleAddressSelect } = require('../controller/order');
const { getAddress } = require('../services/address');
const { getProduct } = require('../services/product');
const { checkProductInCart, checkAddressSelected } = require('../middlewere/auth');
const Order = require('../models/order');
const User = require('../models/user');
const { handleAddProduct } = require('../controller/product');

const router = express.Router();

// router for home page
router.get('/', async (req, res) => {
    const products = await Product.find({});
    res.render('home', { products: products, user: req.user.role });
});

//route to add product only available to admin
router.get('/addProduct', (req, res) => {
    if (req.user.role === 'admin') return res.render('addProduct', { user: req.user.role });
    return res.redirect('/');
});

//router to select delivery address accessable only if you have a product in cart
router.get('/address', checkProductInCart, async (req, res) => {
    const addresses = await Address.find({ addressOwner: req.user._id });
    return res.render('address', { addresses: addresses, user: req.user.role });
});

//router to confirmation page of placed order accessable only if you have made a purchase
router.get('/completion', checkAddressSelected, async (req, res) => {
    // extract product and address which were stored as cookies
    const addressCookie = req.cookies?.address;
    const productCookie = req.cookies?.product;
    const address = getAddress(addressCookie);
    const product = getProduct(productCookie);
    // storing placed order in database and adding it to user who placed it
    const order = await Order.create({
        product: product.product._id,
        address: address.address._id,
    })
    await User.findOneAndUpdate({
        _id: req.user._id,
    }, {
        $push: {
            ordersPlaced: {
                order: order._id,
            }
        }
    })
    res.clearCookie('address');
    res.clearCookie('product');
    return res.render('completion', { address: address, product: product, user: req.user.role });
});

// router that handle new address being added
router.post('/address', handleAddAddress);
// router that handle items being added in cart
router.post('/cart/:id', handleCartItem);
// router that handle selection of delivery address
router.post('/select', handleAddressSelect);
//router that handle product addition in database
router.post('/addProduct', handleAddProduct);

module.exports = router;