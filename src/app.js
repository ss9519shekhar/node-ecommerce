const express = require('express');
const userRouter = require('./routers/user');
var cors = require('cors');
require('dotenv').config();
require('./db');
const app = express();
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(userRouter);

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
