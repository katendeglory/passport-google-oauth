const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  sub: String,
  email: String,
  name: String,
  given_name: String,
  family_name: String,
  picture: String,
  email_verified: Boolean,
  locale: String
});

const User = mongoose.model('user', UserSchema);

module.exports = User;