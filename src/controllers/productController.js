const Product = require('../models/productModel');
module.exports = {
  addProduct: function (req, res, next) {
    const { name, type } = req.body;
    const product = new Product({
      name,
      type,
    });
    product.save();
    console.log(product);
    res.json({ product: product });
  },

  findProduct: async function (req, res, next) {
    const name = req.body.name;

    const product = await Product.find({ name: name }).sort({ date: -1 });
    if (product) {
      return res.status(200).send(product[0].type);
    }
    res.status(404).send('No orders found');
  },
};
