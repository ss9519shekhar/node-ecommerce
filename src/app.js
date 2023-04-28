const express = require('express');
var cors = require('cors');
const jwt = require('jsonwebtoken');

const passport = require('passport');
const db = require('./db');
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./passportConfig')(passport);

const PORT = 3000;
app.post(
  '/auth/signup',
  passport.authenticate('local-signup', { session: false }),
  (req, res, next) => {
    // sign up
    console.log(req.user);
    res.json({
      user: req.user,
    });
  }
);
app.post(
  '/auth/login',
  passport.authenticate('local-login', { session: false }),
  (req, res, next) => {
    // login
    jwt.sign(
      { user: req.user },
      'secretKey',
      { expiresIn: '1h' },
      (err, token) => {
        if (err) {
          return res.json({
            message: 'Failed to login',
            token: null,
          });
        }
        res.json({
          token,
        });
      }
    );
  }
);
app.get(
  '/user/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    res.json({ user: req.user });
  }
);
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
