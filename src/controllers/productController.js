const Product = require('../models/productModel');
module.exports = {
  ram: function (req, res, next) {
    const { name, type } = req.body;
    const product = new Product({
      name,
      type,
    });
    product.save();
    console.log(product);
    res.json({ product: product });
  },
};
