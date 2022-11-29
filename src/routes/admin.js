const express = require('express');

const router = express.Router();

const productController = require('../controllers/admin/products');

router.get('/editproduct/:productID', productController.getEditproductPage);

router.get('/editproduct', productController.getEditproductPage);
router.post('/editproduct', productController.AddProduct);

router.get('/products', productController.getAllProduct);

module.exports = router;
