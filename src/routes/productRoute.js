var express = require('express');
var productController = require('../controllers/productController');
const Product = require('../models/productModel');

var router = express.Router();
router.post('/addProduct', productController.ram);
router.post('/findProduct', async (req, res, next) => {
  const name = req.body.name;

  const product = await Product.find({ name: name }).sort({ date: -1 });
  if (product) {
    return res.status(200).send(product[0].type);
  }
  res.status(404).send('No orders found');
});

module.exports = router;
