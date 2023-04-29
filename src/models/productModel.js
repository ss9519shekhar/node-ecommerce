const mongoose = require('mongoose');

const { Schema } = mongoose;
const ProductSchema = new Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
  },
});
const ProductModel = mongoose.model('product', ProductSchema);
module.exports = ProductModel;
