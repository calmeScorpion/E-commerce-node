const express = require('express');

const router = express.Router();
const productController = require('../controllers/shop/products');
const productControllers = require('../controllers/shop/cart');
router.get('/', productController.getAllProduct);
router.post('/', productControllers.addToCart);
router.get('/', productControllers.getProductId);
module.exports = router;
