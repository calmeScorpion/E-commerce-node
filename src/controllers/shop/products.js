// const Product = require('../../model/product');

// exports.getAllProduct = (req, res, next) => {
//   Product.fetchAll((products) => {
//     res.render('shop/shop', {
//       pagetitle: 'Home Page',
//       products: products,
//       activelink: '/',
//     });
//   });
// };

const Product = require('../../model/product');

exports.getAllProduct = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/shop', {
      pagetitle: 'Home Page',
      products: products,
      activelink: '/',
    });
  });
};

exports.addToCart = (req, res, next) => {
  console.log(req.body);
  const { productId } = req.body;
  const product = new Product(productId);

  product.save(() => {
    res.redirect('/admin/products');
  });

  console.log(product);
};
