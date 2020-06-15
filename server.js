require('dotenv').config();
require('./config/mongoose-setup');
require('./config/passport-setup');

const cookieSession = require('cookie-session');

const express = require('express');
const passport = require('passport');
const isAuth = require('./middlewares/isAuth');
const app = express();

app.set('view engine', 'ejs');

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY]
}))

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.render('home', { user: req.user }));
app.use('/auth', require('./routes/auth'));
app.use('/profile', isAuth, require('./routes/profile'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`⚡ http://localhost:${port}`));