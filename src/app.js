const express = require('express');
const session = require('express-session');
var cors = require('cors');
const passport = require('passport');

// const db = require('./db');
require('./auth');
const app = express();
app.use(session({ secret: 'cats' }));
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

const PORT = 5001;
app.get('/', (req, res, next) => {
  res.send('<a href="auth/google">Authenticate with Google</a>');
});
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);
app.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure',
  })
);
app.get('/auth/failure', (req, res) => {
  res.send('authentication failed');
});
app.get('/protected', isLoggedIn, (req, res) => {
  res.send(`hello ${req.user.displayName}`);
});

app.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy();
    res.send('logged out');
    // res.redirect('/');
  });
});
// app.get('/logout', (req, res) => {
//   req.logout();
//   req.session.destroy();
//   res.send('logged out');
// });

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
