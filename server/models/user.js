const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const UserSchema = Schema({
  username: String,
  badge: String,
  name: String,
  locked: { type: Boolean, default: false },
  token: String,
  admin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  online: { type: Boolean, default: false },
  lastAction: String
});

UserSchema.methods.createToken = function() {
  return jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_TOKEN_EXPIRE
    }
  );
};

UserSchema.methods.verifyToken = (token, callback) => {
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    // console.log("VERIFY TOKEN", err, decoded);

    let current_time = new Date().getTime() / 1000;

    if (current_time > decoded.exp) {
      console.log("JWT is expired");
    }

    if (decoded.exp - decoded.iat != process.env.JWT_TOKEN_EXPIRE) {
      console.log("JWT is not authentic");
    }

    if (err) {
      return callback(err);
    }

    return callback(decoded);
  });
};

module.exports = UserSchema;
