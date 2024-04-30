const Product = require('../models/products');

// function that add new product in database only accessable to admin
async function handleAddProduct(req, res) {
    const { productName, productDescription, productPrice, quantity, productImageURL } = req.body;
    await Product.create({
        productName: productName,
        productDescription: productDescription,
        productPrice: productPrice,
        quantity: quantity,
        productImageURL: productImageURL,
    })
    return res.redirect('/addProduct');
};

async function handleEditProduct(req, res) {
    const id = req.params.id;
    const { productName, productDescription, productPrice, quantity, productImageURL } = req.body;
    await Product.findByIdAndUpdate({
        _id: id
    }, {
        productName: productName,
        productDescription: productDescription,
        productPrice: productPrice,
        productImageURL: productImageURL,
        quantity: quantity
    });
    return res.redirect('/');
}

module.exports = {
    handleAddProduct,
    handleEditProduct,
}