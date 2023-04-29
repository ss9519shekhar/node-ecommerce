var express = require('express');
var productController = require('../controllers/productController');
const Product = require('../models/productModel');

var router = express.Router();
router.post('/addProduct', productController.addProduct);

router.post('/findProduct', productController.findProduct);

module.exports = router;
