const Product = require('../../model/cart');
exports.addToCart = (req, res, next) => {
  Product.getProductDetailsByIds(req.body.cartproduct, () => {
    res.redirect('/');
  });
};
exports.getProductId = (req, res, next) => {
  console.log('fileContent:-');
  let addToCart = false;
  Product.getAllProducts((fileContent) => {
    console.log('fileContent:-', fileContent);
  });
  if (req.params.productID) {
    addToCart = true;
  }
  if (addToCart) {
    return res.render('shop/shop', {
      pagetitle: 'Home',
      activelink: '/',
      isaddToCart: false,
    });
  }
};
