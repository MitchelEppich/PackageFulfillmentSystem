const mongoose = require("mongoose");

const UserSchema = require("./user");
const LogSchema = require("./log");
const OrderSchema = require("./order");
const SttCacheSchema = require("./sttCache");

const User = mongoose.model("User", UserSchema);
const Log = mongoose.model("Log", LogSchema);
const Order = mongoose.model("Order", OrderSchema);
const SttCache = mongoose.model("SttCache", SttCacheSchema);

exports.User = User;
exports.Log = Log;
exports.Order = Order;
exports.SttCache = SttCache;
