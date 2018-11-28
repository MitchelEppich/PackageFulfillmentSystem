const mongoose = require("mongoose");

const UserSchema = require("./user");
const LogSchema = require("./log");

const User = mongoose.model("User", UserSchema);
const Log = mongoose.model("Log", LogSchema);

exports.User = User;
exports.Log = Log;
