const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
const dbUrl = 'mongodb://127.0.0.1:27017/user-ecomm-passport';
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
