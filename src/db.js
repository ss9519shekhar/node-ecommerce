const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
const dbUrl = 'mongodb://127.0.0.1:27017/jwt-ecommerce-multer-image';
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch((err) => {
    console.error(err);
  });
