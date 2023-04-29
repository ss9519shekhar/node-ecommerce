var express = require('express');
var productController = require('../controllers/productController');
var router = express.Router();
router.post('/user/product', productController.ram);

module.exports = router;
