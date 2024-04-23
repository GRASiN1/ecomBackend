const Product = require('../models/products');

// function that add new product in database only accessable to admin
async function handleAddProduct(req, res) {
    const { productName, productDescription, productPrice, quantity } = req.body;
    await Product.create({
        productName: productName,
        productDescription: productDescription,
        productPrice: productPrice,
        quantity: quantity,
    })
    return res.redirect('/addProduct');
};

module.exports = {
    handleAddProduct,
}