const { v1: uuidv1 } = require('uuid');
const Product = require('../../model/product');

exports.getEditproductPage = (req, res, next) => {
  let editMode = false;
  if (req.params.productID) {
    editMode = true;
  }
  if (!editMode) {
    return res.render('admin/editproduct', {
      pagetitle: 'Add product',
      activelink: '/admin/editproduct',
      iseditMode: false,
      id: req.params.productID,
    });
  }
  Product.getProductDetailsById(req.params.productID, (productData) => {
    res.render('admin/editproduct', {
      pagetitle: 'Add product',
      activelink: '/admin/editproduct',
      productData: productData,
      iseditMode: true,
    });
  });
};
exports.AddProduct = (req, res, next) => {
  const { productId, title, price, image, description } = req.body;
  const product = new Product(
    productId ? productId : uuidv1(),
    title,
    price,
    image,
    description
  );
  if (productId) {
    product.update(() => {
      res.redirect('/admin/products');
    });
  } else {
    product.save(() => {
      res.redirect('/admin/products');
    });
  }
};

exports.getAllProduct = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/list', {
      pagetitle: 'List page',
      products: products,
      activelink: '/admin/products',
    });
  });
};
