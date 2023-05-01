const express = require('express');
const userRouter = require('./routers/user');
const itemRouter = require('./routers/item');

var cors = require('cors');
require('dotenv').config();
require('./db');
const app = express();
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(userRouter);
app.use(itemRouter);

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
