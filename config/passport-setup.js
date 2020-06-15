const passport = require('passport');
const User = require('../models/User');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//middiewares
passport.use(new GoogleStrategy(
  {
    clientID: process.env.O_AUTH_CLIENT_ID,
    clientSecret: process.env.O_AUTH_CLIENT_SECRET,
    callbackURL: "/auth/google/redirect"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {

      let found = await User.findOne({ sub: profile._json.sub });

      if (found) done(null, found);

      else {
        const user = new User({ ...profile._json });
        await user.save();
        done(null, found);
      }

    } catch (error) {
      console.log(`😞 ${err.message}`);
      done(err);
    }
  }
));

//get executed after passport use is done
passport.serializeUser((user, done) => { done(null, user.id) });

//get executed after passport use is done
passport.deserializeUser(async (id, done) => {
  let user = await User.findOne({ _id: id });
  done(null, user);
});