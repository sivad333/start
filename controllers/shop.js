const Product = require('../models/product');

exports.getAllProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('index', { name: 'Legend', prods: products, path: '/', pageTitle: 'Home' });
        })
        .catch(err => console.log(err));
};

exports.getProductDetail = (req, res, next) => {
    Product.findById(req.params.prodId)
        .then(product => {
            res.render('product-detail', { prod: product, pageTitle: 'Product Detail', path: '/', name: 'Dlipkart' });
        })
        .catch(err => console.log(err));
}

exports.addToCart = (req, res, next) => {
    req.user.addToCart(req.body.id)
        .then(() => {
            res.redirect('/cart');
        }).catch(err => console.log(err));
}

exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .then(user => {
            console.log(user);
            res.render('cart', { cart: user.cart, pageTitle: 'Shopping Cart Detail', path: '/cart', name: 'Dlipkart' });
        })
        .catch(err => console.log(err));
}

exports.deleteInCart = (req, res, next) => {
    req.user.removeFromCart(req.body.prodId)
        .then(() => {
            res.redirect('/cart');
        }).catch(err => console.log(err));

}